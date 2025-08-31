export function buildPhase1Prompt(resumeContent, jdContent, selfIntroContent) {
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