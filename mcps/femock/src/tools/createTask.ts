import * as path from 'path';
import { TaskFile } from '../types.js';
import { 
  ensureDirectoryExists, 
  fileExists, 
  writeJsonFile, 
  generateTaskId, 
  getTasksDirectory 
} from '../lib/fileUtils.js';

interface CreateTaskArgs {
  resumePath: string;
  jdPath: string;
  selfIntroPath?: string;
}

export async function createInterviewTask(args: CreateTaskArgs) {
  const { resumePath, jdPath, selfIntroPath } = args;

  // 验证文件路径
  if (!fileExists(resumePath)) {
    throw new Error(`简历文件不存在: ${resumePath}`);
  }

  if (!fileExists(jdPath)) {
    throw new Error(`职位描述文件不存在: ${jdPath}`);
  }

  if (selfIntroPath && !fileExists(selfIntroPath)) {
    throw new Error(`自我介绍文件不存在: ${selfIntroPath}`);
  }

  // 创建任务目录
  const tasksDir = getTasksDirectory();
  ensureDirectoryExists(tasksDir);

  // 生成任务文件
  const taskId = generateTaskId();
  const taskFile: TaskFile = {
    taskId,
    createdAt: new Date().toISOString(),
    status: 'pending_analysis',
    userInput: {
      resumePath: path.resolve(resumePath),
      jdPath: path.resolve(jdPath),
      selfIntroductionPath: selfIntroPath ? path.resolve(selfIntroPath) : undefined
    },
    interviewTranscript: []
  };

  const taskFilePath = path.join(tasksDir, `${taskId}.json`);
  writeJsonFile(taskFilePath, taskFile);

  return {
    content: [
      {
        type: 'text',
        text: `✅ 面试任务创建成功！\n\n📋 任务ID: ${taskId}\n📁 任务文件: ${taskFilePath}\n📄 简历: ${resumePath}\n📄 职位描述: ${jdPath}${selfIntroPath ? `\n📄 自我介绍: ${selfIntroPath}` : ''}\n\n🔍 下一步: 使用 analyze_task_phase1 工具开始第一阶段分析`
      }
    ]
  };
}