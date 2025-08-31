import * as path from 'path';
import { getTasksDirectory, readJsonFile } from '../lib/fileUtils.js';

export async function getTaskStatus(args) {
  const { taskId } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task;
  
  try {
    task = readJsonFile(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 构建状态报告
  let statusReport = `📊 面试任务状态报告\n========================================\n`;
  statusReport += `📋 任务ID: ${taskId}\n`;
  statusReport += `📅 创建时间: ${new Date(task.createdAt).toLocaleString()}\n`;
  statusReport += `🔄 当前状态: ${getStatusDescription(task.status)}\n\n`;

  // 输入文件信息
  statusReport += `📁 输入文件:\n`;
  statusReport += `  📄 简历: ${task.userInput.resumePath}\n`;
  statusReport += `  📄 职位描述: ${task.userInput.jdPath}\n`;
  if (task.userInput.selfIntroductionPath) {
    statusReport += `  📄 自我介绍: ${task.userInput.selfIntroductionPath}\n`;
  }

  // 面试轮次信息
  if (task.analysisOutput) {
    statusReport += `\n🎯 面试轮次:\n`;
    task.analysisOutput.interviewRounds.forEach(round => {
      statusReport += `  ${round.round}. ${round.title} (${round.questions.length}题)\n`;
    });
  }

  // 面试进度
  if (task.interviewTranscript && task.interviewTranscript.length > 0) {
    statusReport += `\n📈 面试进度:\n`;
    const roundProgress = {};
    task.interviewTranscript.forEach(transcript => {
      if (!roundProgress[transcript.round]) {
        roundProgress[transcript.round] = 0;
      }
      if (!transcript.isFollowUp) {
        roundProgress[transcript.round]++;
      }
    });

    Object.keys(roundProgress).forEach(round => {
      const roundData = task.analysisOutput?.interviewRounds.find(r => r.round === parseInt(round));
      if (roundData) {
        statusReport += `  第${round}轮: ${roundProgress[round]}/${roundData.questions.length}题已完成\n`;
      }
    });
  }

  // 下一步操作
  statusReport += `\n🚀 下一步操作:\n${getNextAction(task.status)}`;

  return {
    content: [
      {
        type: 'text',
        text: statusReport
      }
    ]
  };
}

function getStatusDescription(status) {
  const descriptions = {
    'pending_analysis': '等待分析',
    'analysis_complete': '分析完成，可开始面试',
    'round1_inprogress': '第1轮面试进行中',
    'round1_complete': '第1轮面试已完成',
    'round2_inprogress': '第2轮面试进行中',
    'round2_complete': '第2轮面试已完成',
    'round3_inprogress': '第3轮面试进行中',
    'round3_complete': '第3轮面试已完成',
    'hr_inprogress': 'HR面试进行中',
    'interview_complete': '所有面试已完成'
  };

  return descriptions[status] || status;
}

function getNextAction(status) {
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
      return `继续当前轮次的面试`;
  }
}