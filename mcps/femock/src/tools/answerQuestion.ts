import * as path from 'path';
import { TaskFile, TranscriptEntry, TaskStatus } from '../types.js';
import { getTasksDirectory, readJsonFile, writeJsonFile } from '../lib/fileUtils.js';
// 移除 aiService 导入，追问将通过 AI 编辑器生成
import { extractKeywords, searchMaterials } from '../lib/materialsSearch.js';

interface AnswerQuestionArgs {
  taskId: string;
  questionId: number;
  answer: string;
  requestFollowUp?: boolean;
}

export async function answerQuestion(args: AnswerQuestionArgs) {
  const { taskId, questionId, answer, requestFollowUp = false } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task: TaskFile;
  
  try {
    task = readJsonFile<TaskFile>(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  if (!task.analysisOutput) {
    throw new Error('任务尚未分析完成');
  }

  // 确定当前轮次
  const currentRound = getCurrentRound(task.status);
  if (!currentRound) {
    throw new Error(`当前状态不允许回答问题: ${task.status}`);
  }

  const interviewRound = task.analysisOutput.interviewRounds.find(r => r.round === currentRound);
  if (!interviewRound) {
    throw new Error(`第${currentRound}轮面试数据不存在`);
  }

  // 查找问题
  const question = interviewRound.questions.find(q => q.id === questionId);
  if (!question) {
    throw new Error(`问题ID ${questionId} 不存在于第${currentRound}轮面试中`);
  }

  // 记录回答
  const transcriptEntry: TranscriptEntry = {
    transcriptId: `t${Date.now()}`,
    round: currentRound,
    questionId: questionId,
    questionText: question.text,
    userAnswer: answer.trim()
  };

  task.interviewTranscript.push(transcriptEntry);

  let responseText = `✅ 回答已记录！\n\n📝 问题: ${question.text}\n💬 回答: ${answer}\n\n`;

  // 处理追问请求
  if (requestFollowUp) {
    const keywords = extractKeywords(answer);
    const relevantMaterials = searchMaterials(keywords, 3);
    
    const followUpPrompt = buildFollowUpPrompt(question.text, answer, relevantMaterials);
    
    responseText += `🔍 请生成追问：\n\n${followUpPrompt}\n\n请直接提供追问内容，然后我会记录到面试记录中。`;
  } else {
    // 检查是否还有更多问题
    const answeredQuestions = task.interviewTranscript
      .filter(entry => entry.round === currentRound && entry.questionId !== null && entry.userAnswer.trim() !== '')
      .map(entry => entry.questionId);
    
    const nextQuestion = interviewRound.questions.find(q => !answeredQuestions.includes(q.id));
    
    if (nextQuestion) {
      responseText += `📝 下一题 (${answeredQuestions.length + 1}/${interviewRound.questions.length}):\n${nextQuestion.text}\n\n💡 继续回答或请求追问`;
    } else {
      // 本轮完成
      task.status = getCompleteStatus(currentRound);
      responseText += `🎉 第${currentRound}轮面试完成！\n\n`;
      
      if (currentRound < 4) {
        responseText += `🚀 可以开始下一轮: start_interview_round (round=${currentRound + 1})`;
      } else {
        task.status = 'interview_complete';
        responseText += `🏆 所有面试轮次完成！恭喜！`;
      }
    }
  }

  writeJsonFile(taskFilePath, task);

  return {
    content: [
      {
        type: 'text',
        text: responseText
      }
    ]
  };
}

function getCurrentRound(status: TaskStatus): number | null {
  if (status.includes('round1')) return 1;
  if (status.includes('round2')) return 2;
  if (status.includes('round3')) return 3;
  if (status.includes('hr')) return 4;
  return null;
}

function getCompleteStatus(round: number): TaskStatus {
  const statusMap = {
    1: 'round1_complete' as TaskStatus,
    2: 'round2_complete' as TaskStatus,
    3: 'round3_complete' as TaskStatus,
    4: 'hr_complete' as TaskStatus
  };

  return statusMap[round as keyof typeof statusMap];
}

export async function addFollowUpQuestion(args: {
  taskId: string;
  parentTranscriptId: string;
  followUpQuestion: string;
}) {
  const { taskId, parentTranscriptId, followUpQuestion } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task: TaskFile;
  
  try {
    task = readJsonFile<TaskFile>(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 查找父记录
  const parentEntry = task.interviewTranscript.find(entry => entry.transcriptId === parentTranscriptId);
  if (!parentEntry) {
    throw new Error(`找不到父记录: ${parentTranscriptId}`);
  }

  // 添加追问记录
  const followUpEntry: TranscriptEntry = {
    transcriptId: `t${Date.now()}`,
    parentTranscriptId: parentTranscriptId,
    round: parentEntry.round,
    questionId: null,
    questionText: followUpQuestion,
    userAnswer: '' // 等待回答
  };

  task.interviewTranscript.push(followUpEntry);
  writeJsonFile(taskFilePath, task);

  return {
    content: [
      {
        type: 'text',
        text: `✅ 追问已添加！\n\n🔍 追问: ${followUpQuestion}\n\n💡 请使用 answer_interview_question 工具回答追问\n参数: taskId="${taskId}", questionId=null, answer="你的回答"`
      }
    ]
  };
}

function buildFollowUpPrompt(questionText: string, userAnswer: string, relevantMaterials: any[]): string {
  const materialsContext = relevantMaterials.length > 0 
    ? `\n## 相关技术材料\n${relevantMaterials.map(m => `### ${m.fileName}\n${m.content.substring(0, 300)}...`).join('\n\n')}`
    : '';

  return `## 面试追问生成

**原始问题**: ${questionText}

**候选人回答**: ${userAnswer}

${materialsContext}

## 追问要求
请基于候选人的回答生成一个有针对性的追问，要求：
- 针对回答中的关键点进行深入挖掘
- 可以要求提供更具体的实现细节
- 可以询问实际项目中的应用经验  
- 可以测试相关的扩展知识点
- 追问应该自然流畅，符合面试场景

请直接提供追问内容，无需其他格式。

完成后，请使用 add_follow_up_question 工具添加追问。`;
}