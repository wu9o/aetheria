import { getRound1Prompt } from './round1.js';
import { getRound2Prompt } from './round2.js';
import { getRound3Prompt } from './round3.js';
import { getRound4Prompt } from './round4.js';
import { getRandomPerspective } from './perspectives.js';

export function buildPhase2Prompt(keywords, interviewFocus, relevantMaterials) {
  const materialsSection = relevantMaterials.length > 0 
    ? `## 相关知识材料\n${relevantMaterials.map(m => `### ${m.fileName}\n${m.content.substring(0, 500)}...`).join('\n\n')}`
    : '';

  const perspective = getRandomPerspective();

  return `## 关键技术词汇
${keywords.join(', ')}

## 各轮面试重点方向
- **第1轮重点**: ${interviewFocus.round1}
- **第2轮重点**: ${interviewFocus.round2}  
- **第3轮重点**: ${interviewFocus.round3}
- **第4轮重点**: ${interviewFocus.round4}

${materialsSection}

## 问题生成要求

**核心面试视角**:
- **视角名称**: ${perspective.name}
- **视角描述**: ${perspective.description}

请严格遵循以上视角，并结合下面的各轮具体要求，为每一轮面试生成5-7个高质量问题。

${getRound1Prompt()}

${getRound2Prompt()}

${getRound3Prompt()}

${getRound4Prompt()}

### 问题格式要求
每个问题必须包含：
- **text**: 问题内容
- **examPoint**: 考察要点（这个问题主要想考察什么能力）
- **suggestedAnswer**: 推荐回答要点（面试官参考）
- **difficulty**: 难度等级（简单|中等|困难）

**重要指令**: 请发挥你的创造力，即使是相同的候选人和职位，也要确保本次生成的问题组合是新颖的、与以往不同的。请根据本次随机选择的“核心面试视角”来调整你的提问策略和侧重点。`;
}