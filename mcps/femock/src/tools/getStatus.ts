import * as path from 'path';
import { TaskFile } from '../types.js';
import { getTasksDirectory, readJsonFile } from '../lib/fileUtils.js';

interface GetStatusArgs {
  taskId: string;
}

export async function getTaskStatus(args: GetStatusArgs) {
  const { taskId } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task: TaskFile;
  
  try {
    task = readJsonFile<TaskFile>(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  let statusText = `📊 面试任务状态报告\n${'='.repeat(40)}\n`;
  statusText += `📋 任务ID: ${task.taskId}\n`;
  statusText += `📅 创建时间: ${new Date(task.createdAt).toLocaleString()}\n`;
  statusText += `🔄 当前状态: ${getStatusDescription(task.status)}\n\n`;

  statusText += `📁 输入文件:\n`;
  statusText += `  📄 简历: ${task.userInput.resumePath}\n`;
  statusText += `  📄 职位描述: ${task.userInput.jdPath}\n`;
  if (task.userInput.selfIntroductionPath) {
    statusText += `  📄 自我介绍: ${task.userInput.selfIntroductionPath}\n`;
  }

  if (task.analysisOutput) {
    statusText += `\n🎯 面试轮次:\n`;
    task.analysisOutput.interviewRounds.forEach(round => {
      statusText += `  ${round.round}. ${round.title} (${round.questions.length}题)\n`;
    });
  }

  if (task.interviewTranscript.length > 0) {
    statusText += `\n💬 面试进度: 已回答 ${task.interviewTranscript.filter(t => t.userAnswer.trim() !== '').length} 个问题\n`;
    
    const roundProgress = new Map<number, number>();
    task.interviewTranscript.forEach(entry => {
      if (entry.questionId !== null && entry.userAnswer.trim() !== '') {
        roundProgress.set(entry.round, (roundProgress.get(entry.round) || 0) + 1);
      }
    });

    if (roundProgress.size > 0) {
      statusText += `\n📈 各轮进度:\n`;
      roundProgress.forEach((count, round) => {
        const totalQuestions = task.analysisOutput?.interviewRounds.find(r => r.round === round)?.questions.length || 0;
        statusText += `  第${round}轮: ${count}/${totalQuestions} 题已完成\n`;
      });
    }
  }

  statusText += `\n🚀 下一步操作:\n`;
  statusText += getNextStepSuggestion(task.status, taskId);

  return {
    content: [
      {
        type: 'text',
        text: statusText
      }
    ]
  };
}

function getStatusDescription(status: string): string {
  const descriptions = {
    'pending_analysis': '等待分析',
    'analysis_complete': '分析完成，可开始面试',
    'round1_inprogress': '第1轮面试进行中',
    'round1_complete': '第1轮面试完成',
    'round2_inprogress': '第2轮面试进行中',
    'round2_complete': '第2轮面试完成',
    'round3_inprogress': '第3轮面试进行中',
    'round3_complete': '第3轮面试完成',
    'hr_inprogress': 'HR面试进行中',
    'hr_complete': 'HR面试完成',
    'interview_complete': '所有面试完成'
  };

  return descriptions[status as keyof typeof descriptions] || status;
}

function getNextStepSuggestion(status: string, taskId: string): string {
  switch (status) {
    case 'pending_analysis':
      return `使用 analyze_task_phase1 工具开始第一阶段分析`;
    case 'analysis_complete':
      return `使用 start_interview_round 工具开始第1轮面试 (round=1)`;
    case 'round1_complete':
      return `使用 start_interview_round 工具开始第2轮面试 (round=2)`;
    case 'round2_complete':
      return `使用 start_interview_round 工具开始第3轮面试 (round=3)`;
    case 'round3_complete':
      return `使用 start_interview_round 工具开始HR面试 (round=4)`;
    case 'interview_complete':
      return `🎉 所有面试已完成！`;
    default:
      if (status.includes('inprogress')) {
        return `使用 answer_interview_question 工具继续回答问题`;
      }
      return `检查任务状态`;
  }
}