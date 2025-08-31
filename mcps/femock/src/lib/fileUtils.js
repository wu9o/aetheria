import * as fs from 'fs';
import * as path from 'path';

// 获取任务目录
export function getTasksDirectory() {
  const tasksDir = path.join(process.cwd(), 'tasks');
  if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true });
  }
  return tasksDir;
}

// 读取 JSON 文件
export function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`无法读取文件 ${filePath}: ${error.message}`);
  }
}

// 写入 JSON 文件
export function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`无法写入文件 ${filePath}: ${error.message}`);
  }
}

// 读取文件内容
export function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`无法读取文件 ${filePath}: ${error.message}`);
  }
}

// 生成唯一任务ID
export function generateTaskId() {
  return `task-${Date.now()}`;
}