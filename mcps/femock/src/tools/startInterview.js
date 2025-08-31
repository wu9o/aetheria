import * as path from 'path';
import { getTasksDirectory, readJsonFile, writeJsonFile } from '../lib/fileUtils.js';

export async function startInterview(args) {
  const { taskId, round } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task;
  
  try {
    task = readJsonFile(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 检查分析是否完成
  if (!task.analysisOutput) {
    throw new Error('请先完成任务分析');
  }

  // 检查轮次是否有效
  if (round < 1 || round > 4) {
    throw new Error('面试轮次必须在1-4之间');
  }

  // 检查是否可以开始这一轮
  const canStart = canStartRound(task.status, round);
  if (!canStart) {
    throw new Error(`无法开始第${round}轮面试，当前状态: ${task.status}`);
  }

  const interviewRound = task.analysisOutput.interviewRounds.find(r => r.round === round);
  if (!interviewRound) {
    throw new Error(`第${round}轮面试数据不存在`);
  }

  // 更新状态为进行中
  task.status = getInProgressStatus(round);
  writeJsonFile(taskFilePath, task);

  // 返回面试轮次信息和第一个问题
  const firstQuestion = interviewRound.questions[0];
  
  return {
    content: [
      {
        type: 'text',
        text: `🎯 开始 ${interviewRound.title}

👤 **面试官**: ${interviewRound.interviewerProfile}

📝 **第1/${interviewRound.questions.length}题**:
${firstQuestion.text}

${firstQuestion.examPoint ? `🎯 **考察点**: ${firstQuestion.examPoint}` : ''}
${firstQuestion.difficulty ? `📊 **难度**: ${firstQuestion.difficulty}` : ''}

⏳ **请回答这个问题，我会等待您的回答...**

💡 使用 answer_interview_question 工具回答:
- taskId: "${taskId}"
- questionId: ${firstQuestion.id}  
- answer: "您的回答内容"`
      }
    ]
  };
}

function canStartRound(status, round) {
  const statusMap = {
    1: ['analysis_complete', 'round1_inprogress'],
    2: ['round1_complete', 'round2_inprogress'],
    3: ['round2_complete', 'round3_inprogress'],
    4: ['round3_complete', 'hr_inprogress']
  };

  return statusMap[round]?.includes(status) || false;
}

function getInProgressStatus(round) {
  const statusMap = {
    1: 'round1_inprogress',
    2: 'round2_inprogress',
    3: 'round3_inprogress',
    4: 'hr_inprogress'
  };

  return statusMap[round];
}