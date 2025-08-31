export function buildPhase2Prompt(keywords, interviewFocus, relevantMaterials) {
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
- **difficulty**: 难度等级（简单|中等|困难）

请充分利用提供的知识材料来设计有深度的问题.`;
}