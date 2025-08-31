import * as path from 'path';
import { TaskFile, InterviewRound, Question } from '../types.js';
import { getTasksDirectory, readJsonFile, writeJsonFile, readFileContent } from '../lib/fileUtils.js';
import { searchMaterials } from '../lib/materialsSearch.js';

interface AnalyzeTaskPhase1Args {
  taskId: string;
}

interface AnalyzeTaskPhase2Args {
  taskId: string;
  keywords: string[];
  interviewFocus: {
    round1: string;
    round2: string;
    round3: string;
    round4: string;
  };
}

// 第一阶段：提取关键词和面试重点
export async function analyzeTaskPhase1(args: AnalyzeTaskPhase1Args) {
  const { taskId } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task: TaskFile;
  
  try {
    task = readJsonFile<TaskFile>(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 检查状态
  if (task.status !== 'pending_analysis') {
    throw new Error(`任务状态错误: ${task.status}，期望状态: pending_analysis`);
  }

  try {
    // 读取用户输入文件
    const resumeContent = readFileContent(task.userInput.resumePath);
    const jdContent = readFileContent(task.userInput.jdPath);
    const selfIntroContent = task.userInput.selfIntroductionPath 
      ? readFileContent(task.userInput.selfIntroductionPath) 
      : undefined;

    // 构建第一阶段分析的 Prompt
    const phase1Prompt = buildPhase1Prompt(resumeContent, jdContent, selfIntroContent);

    return {
      content: [
        {
          type: 'text',
          text: `📋 第一阶段分析：请根据以下信息提取关键技术词汇和各轮面试重点

${phase1Prompt}

请按以下格式回答：

**关键技术词汇**（请提取10-15个最重要的技术关键词）：
- 词汇1
- 词汇2
- ...

**各轮面试重点**：

**第1轮 - 技术同事面（底层技术）重点**：
[基于简历技术栈，重点考察的技术原理方向]

**第2轮 - 直属领导面（业务应用）重点**：
[基于项目经验，重点考察的业务问题解决能力方向]

**第3轮 - 总监/架构师面（架构设计）重点**：
[基于技术深度，重点考察的架构和领导力方向]

**第4轮 - HR面（软实力）重点**：
[基于职业经历，重点考察的软技能方向]

完成分析后，请使用 analyze_task_phase2 工具进入第二阶段。`
        }
      ]
    };

  } catch (error) {
    throw new Error(`第一阶段分析出错: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// 第二阶段：基于关键词生成具体面试题
export async function analyzeTaskPhase2(args: AnalyzeTaskPhase2Args) {
  const { taskId, keywords, interviewFocus } = args;

  // 读取任务文件
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task: TaskFile;
  
  try {
    task = readJsonFile<TaskFile>(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  try {
    // 基于关键词搜索知识库
    const relevantMaterials = searchMaterials(keywords, 15);

    // 构建第二阶段分析的 Prompt
    const phase2Prompt = buildPhase2Prompt(keywords, interviewFocus, relevantMaterials);

    return {
      content: [
        {
          type: 'text',
          text: `🎯 第二阶段分析：请根据关键词和知识库生成具体面试题

📚 已搜索到 ${relevantMaterials.length} 个相关知识材料
🔍 关键词：${keywords.join(', ')}

${phase2Prompt}

请严格按照以下JSON格式输出4轮面试的问题，每个问题必须包含完整的字段：

\`\`\`json
{
  "round1": {
    "title": "技术同事面 (底层技术)",
    "interviewerProfile": "资深前端工程师，专注于技术底层原理和基础知识考察",
    "questions": [
      {
        "id": 1,
        "text": "问题内容",
        "examPoint": "考察要点说明",
        "suggestedAnswer": "推荐回答要点",
        "difficulty": "简单|中等|困难"
      }
    ]
  },
  "round2": {
    "title": "直属领导面 (业务应用)",
    "interviewerProfile": "技术团队Leader，关注实际业务问题解决能力和项目经验",
    "questions": [
      {
        "id": 1,
        "text": "问题内容",
        "examPoint": "考察要点说明",
        "suggestedAnswer": "推荐回答要点",
        "difficulty": "简单|中等|困难"
      }
    ]
  },
  "round3": {
    "title": "总监/架构师面 (架构设计)",
    "interviewerProfile": "技术总监/架构师，评估架构设计能力和技术领导力",
    "questions": [
      {
        "id": 1,
        "text": "问题内容",
        "examPoint": "考察要点说明",
        "suggestedAnswer": "推荐回答要点",
        "difficulty": "简单|中等|困难"
      }
    ]
  },
  "round4": {
    "title": "HR面 (软实力)",
    "interviewerProfile": "人力资源专员，评估软实力和文化契合度",
    "questions": [
      {
        "id": 1,
        "text": "问题内容",
        "examPoint": "考察要点说明",
        "suggestedAnswer": "推荐回答要点",
        "difficulty": "简单|中等|困难"
      }
    ]
  }
}
\`\`\`

⚠️ 重要提醒：生成问题后，请使用 save_analysis_result 工具保存结果，不要直接开始面试！`
        }
      ]
    };

  } catch (error) {
    throw new Error(`第二阶段分析出错: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// 保存分析结果到任务文件
export async function saveAnalysisResult(taskId: string, analysisResult: any) {
  const taskFilePath = path.join(getTasksDirectory(), `${taskId}.json`);
  let task: TaskFile;
  
  try {
    task = readJsonFile<TaskFile>(taskFilePath);
  } catch (error) {
    throw new Error(`任务文件不存在或无法读取: ${taskId}`);
  }

  // 转换格式
  const interviewRounds: InterviewRound[] = [];
  
  for (let i = 1; i <= 4; i++) {
    const roundKey = `round${i}` as keyof typeof analysisResult;
    const roundData = analysisResult[roundKey];
    
    if (roundData) {
      const questions: Question[] = roundData.questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        examPoint: q.examPoint,
        suggestedAnswer: q.suggestedAnswer,
        difficulty: q.difficulty
      }));

      interviewRounds.push({
        round: i,
        title: roundData.title,
        interviewerProfile: roundData.interviewerProfile,
        questions
      });
    }
  }

  // 更新任务文件
  task.analysisOutput = {
    summary: `基于简历和JD分析，为候选人生成了${interviewRounds.reduce((total, round) => total + round.questions.length, 0)}个面试问题，涵盖技术基础、业务应用、架构设计和软实力四个维度。`,
    interviewRounds
  };
  
  task.status = 'analysis_complete';
  writeJsonFile(taskFilePath, task);

  return {
    content: [
      {
        type: 'text',
        text: `✅ 面试问题生成完成！\n\n📊 生成结果:\n${interviewRounds.map(round => `- ${round.title}: ${round.questions.length}题`).join('\n')}\n\n🚀 下一步: 使用 start_interview_round 工具开始面试`
      }
    ]
  };
}

function buildPhase1Prompt(resumeContent: string, jdContent: string, selfIntroContent?: string): string {
  return `## 候选人简历
${resumeContent}

## 职位描述  
${jdContent}

${selfIntroContent ? `## 自我介绍\n${selfIntroContent}` : ''}

## 分析要求

请仔细分析以上材料，完成以下任务：

1. **提取关键技术词汇**：从简历和JD中提取10-15个最重要的技术关键词，这些词汇将用于搜索相关的面试材料。

2. **确定各轮面试重点**：
   - **第1轮（技术同事面）**：重点考察技术基础，如JavaScript核心、CSS、框架原理、算法等
   - **第2轮（直属领导面）**：重点考察业务问题解决能力，结合简历项目经验
   - **第3轮（总监面）**：重点考察架构设计、技术领导力、系统思维
   - **第4轮（HR面）**：重点考察软技能、职业规划、团队协作

请确保分析结果与候选人的实际背景和目标职位高度匹配。`;
}

function buildPhase2Prompt(keywords: string[], interviewFocus: any, relevantMaterials: any[]): string {
  const materialsSection = relevantMaterials.length > 0 
    ? `## 相关知识材料\n${relevantMaterials.map(m => `### ${m.fileName}\n${m.content.substring(0, 500)}...`).join('\n\n')}`
    : '';

  return `## 关键技术词汇
${keywords.join(', ')}

## 各轮面试重点方向
- **第1轮重点**: ${interviewFocus.round1}
- **第2轮重点**: ${interviewFocus.round2}  
- **第3轮重点**: ${interviewFocus.round3}
- **第4轮重点**: ${interviewFocus.round4}

${materialsSection}

## 问题生成要求

请为每一轮面试生成5-7个高质量问题，要求：

### 第1轮 - 技术同事面
- 重点考察技术基础和原理理解
- 必须包含1-2道算法或数据结构题
- 问题要有一定技术深度，避免过于基础

### 第2轮 - 直属领导面  
- 重点考察实际问题解决能力
- 结合候选人的项目经验提问
- 关注技术选型、性能优化等实践经验

### 第3轮 - 总监/架构师面
- 重点考察架构设计和系统思维
- 关注技术领导力和跨团队协作
- 问题要有一定的开放性和深度

### 第4轮 - HR面
- 重点考察软技能和文化匹配
- 使用行为面试法（STAR方法）
- 关注职业规划和团队协作

### 问题格式要求
每个问题必须包含：
- **text**: 问题内容
- **examPoint**: 考察要点（这个问题主要想考察什么能力）
- **suggestedAnswer**: 推荐回答要点（面试官参考）
- **difficulty**: 难度等级（简单/中等/困难）

请充分利用提供的知识材料来设计有深度的问题。`;
}