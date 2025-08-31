import * as path from 'path';
import { getTasksDirectory, writeJsonFile, generateTaskId } from '../lib/fileUtils.js';

export async function createInterviewTask(args) {
  const { resumePath, jdPath, selfIntroPath } = args;

  // 生成任务ID
  const taskId = generateTaskId();
  
  // 创建任务文件
  const task = {
    taskId,
    createdAt: new Date().toISOString(),
    status: 'pending_analysis',
    userInput: {
      resumePath,
      jdPath,
      selfIntroductionPath: selfIntroPath
    },
    interviewTranscript: []
  };

  // 保存任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  writeJsonFile(taskFilePath, task);

  return {
    content: [
      {
        type: 'text',
        text: `✅ 面试任务创建成功！

📋 任务ID: ${taskId}
📁 任务文件: ${taskFilePath}
📄 简历: ${resumePath}
📄 职位描述: ${jdPath}${selfIntroPath ? `\n📄 自我介绍: ${selfIntroPath}` : ''}

🔍 下一步: 使用 analyze_task_phase1 工具开始第一阶段分析`
      }
    ]
  };
}