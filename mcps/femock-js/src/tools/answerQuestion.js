import * as path from 'path';
import { getTasksDirectory, readJsonFile, writeJsonFile } from '../lib/fileUtils.js';

export async function answerQuestion(args) {
  const { taskId, questionId, answer, requestFollowUp = false } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task;
  
  try {
    task = readJsonFile(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 检查当前状态
  const currentRound = getCurrentRound(task.status);
  if (!currentRound) {
    throw new Error(`当前状态不允许回答问题: ${task.status}`);
  }

  // 找到当前轮次的问题
  const interviewRound = task.analysisOutput.interviewRounds.find(r => r.round === currentRound);
  if (!interviewRound) {
    throw new Error(`第${currentRound}轮面试数据不存在`);
  }

  const question = interviewRound.questions.find(q => q.id === questionId);
  if (!question) {
    throw new Error(`问题ID ${questionId} 不存在`);
  }

  // 记录回答
  const transcriptId = `t${Date.now()}`;
  const transcript = {
    transcriptId,
    round: currentRound,
    questionId,
    questionText: question.text,
    userAnswer: answer
  };

  task.interviewTranscript.push(transcript);

  // 检查是否还有下一题
  const currentQuestionIndex = interviewRound.questions.findIndex(q => q.id === questionId);
  const nextQuestionIndex = currentQuestionIndex + 1;
  
  let responseText = `✅ 回答已记录！\n\n`;
  
  if (nextQuestionIndex < interviewRound.questions.length) {
    // 还有下一题
    const nextQuestion = interviewRound.questions[nextQuestionIndex];
    responseText += `📝 **第${nextQuestionIndex + 1}/${interviewRound.questions.length}题**:\n${nextQuestion.text}\n\n`;
    
    if (nextQuestion.examPoint) {
      responseText += `🎯 **考察点**: ${nextQuestion.examPoint}\n`;
    }
    if (nextQuestion.difficulty) {
      responseText += `📊 **难度**: ${nextQuestion.difficulty}\n`;
    }
    
    responseText += `\n💡 继续使用 answer_interview_question 工具回答:\n- taskId: "${taskId}"\n- questionId: ${nextQuestion.id}\n- answer: "您的回答内容"`;
  } else {
    // 当前轮次完成
    task.status = getCompleteStatus(currentRound);
    responseText += `🎉 第${currentRound}轮面试完成！\n\n`;
    
    if (currentRound < 4) {
      responseText += `🚀 可以开始下一轮: start_interview_round (round=${currentRound + 1})`;
    } else {
      task.status = 'interview_complete';
      responseText += `🎊 所有面试轮次已完成！恭喜！`;
    }
  }

  // 保存更新
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

export async function addFollowUpQuestion(args) {
  const { taskId, parentTranscriptId, followUpQuestion } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task;
  
  try {
    task = readJsonFile(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 找到父问题记录
  const parentTranscript = task.interviewTranscript.find(t => t.transcriptId === parentTranscriptId);
  if (!parentTranscript) {
    throw new Error(`找不到记录ID: ${parentTranscriptId}`);
  }

  // 添加追问记录
  const followUpId = `f${Date.now()}`;
  const followUpTranscript = {
    transcriptId: followUpId,
    round: parentTranscript.round,
    questionId: `followup_${parentTranscript.questionId}`,
    questionText: followUpQuestion,
    parentTranscriptId,
    isFollowUp: true
  };

  task.interviewTranscript.push(followUpTranscript);
  writeJsonFile(taskFilePath, task);

  return {
    content: [
      {
        type: 'text',
        text: `📝 **追问**: ${followUpQuestion}\n\n💡 请使用 answer_interview_question 工具回答追问:\n- taskId: "${taskId}"\n- questionId: "${followUpTranscript.questionId}"\n- answer: "您的回答内容"`
      }
    ]
  };
}

function getCurrentRound(status) {
  const statusMap = {
    'round1_inprogress': 1,
    'round2_inprogress': 2,
    'round3_inprogress': 3,
    'hr_inprogress': 4
  };

  return statusMap[status] || null;
}

function getCompleteStatus(round) {
  const statusMap = {
    1: 'round1_complete',
    2: 'round2_complete',
    3: 'round3_complete',
    4: 'interview_complete'
  };

  return statusMap[round];
}