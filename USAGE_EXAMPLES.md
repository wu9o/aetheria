# Aetheria MCP Tools - 使用示例

本文档提供了 Aetheria 仓库中各种 MCP 工具的实际使用示例。

## 📋 Femock - 前端模拟面试

### 完整使用流程示例

#### 1. 准备材料
首先准备好以下文件：
- `resume.pdf` - 个人简历
- `job-description.txt` - 目标职位描述
- `self-intro.txt` - 自我介绍（可选）

#### 2. 创建面试任务
在支持 MCP 的 AI 编辑器中：

```
用户: 请帮我创建一个前端面试任务，简历在 ./resume.pdf，职位描述在 ./job-description.txt

AI: 我来为你创建面试任务。

[调用 create_interview_task 工具]

✅ 面试任务创建成功！
📋 任务ID: task-1703123456789
📁 任务文件: /path/to/tasks/task-1703123456789.json
📄 简历: ./resume.pdf
📄 职位描述: ./job-description.txt

🔍 下一步: 使用 analyze_task_phase1 工具分析任务并生成面试问题
```

#### 3. 第一阶段分析
```
用户: 请开始第一阶段分析，提取关键技术点

AI: 我来分析你的简历和职位要求，提取关键技术词汇和面试重点。

[调用 analyze_task_phase1 工具]

📋 第一阶段分析：请根据以下信息提取关键技术词汇和各轮面试重点

## 候选人简历
[简历内容...]

## 职位描述  
[JD内容...]

请按以下格式回答：

**关键技术词汇**（请提取10-15个最重要的技术关键词）：
- React
- TypeScript
- Webpack
- 性能优化
- 微前端
- Node.js
- GraphQL
- 单元测试
- CI/CD
- 移动端适配

**各轮面试重点**：

**第1轮 - 技术同事面（底层技术）重点**：
重点考察 React Hooks 原理、TypeScript 类型系统、Webpack 构建优化、JavaScript 核心概念

**第2轮 - 直属领导面（业务应用）重点**：
重点考察组件设计模式、性能优化实践、项目架构经验、团队协作中的技术决策

**第3轮 - 总监/架构师面（架构设计）重点**：
重点考察微前端架构设计、大型项目管理、技术选型决策、团队技术规划

**第4轮 - HR面（软实力）重点**：
重点考察学习能力、沟通协作、职业规划、抗压能力和团队融入度

完成分析后，请使用 analyze_task_phase2 工具进入第二阶段。
```

#### 4. 第二阶段分析
```
用户: 基于这些关键词和重点，请生成具体的面试问题

AI: 我来基于关键词搜索知识库，生成具体的面试问题。

[调用 analyze_task_phase2 工具，传入关键词和面试重点]

🎯 第二阶段分析：请根据关键词和知识库生成具体面试题

📚 已搜索到 12 个相关知识材料
🔍 关键词：React, TypeScript, Webpack, 性能优化, 微前端, Node.js, GraphQL, 单元测试, CI/CD, 移动端适配

[显示知识库材料和详细的问题生成要求...]

请严格按照以下JSON格式输出4轮面试的问题：

{
  "round1": {
    "title": "技术同事面 (底层技术)",
    "interviewerProfile": "资深前端工程师，专注于技术底层原理和基础知识考察",
    "questions": [
      {
        "id": 1,
        "text": "请详细解释 React Hooks 的执行顺序和 fiber 调度机制",
        "examPoint": "考察对 React 底层原理的深度理解",
        "suggestedAnswer": "应该提到 fiber 架构、时间切片、优先级调度、hooks 链表结构等",
        "difficulty": "困难"
      },
      {
        "id": 2,
        "text": "请实现一个支持取消的防抖函数，并说明在什么场景下使用",
        "examPoint": "考察算法实现能力和实际应用场景理解",
        "suggestedAnswer": "需要实现 clearTimeout、返回取消函数、说明搜索框等应用场景",
        "difficulty": "中等"
      }
    ]
  },
  // ... 其他轮次
}
```

#### 5. 保存分析结果
```
用户: [提供完整的JSON格式问题]

AI: 我来保存这些面试问题到任务文件中。

[调用 save_analysis_result 工具]

✅ 面试问题生成完成！

📊 生成结果:
- 技术同事面 (底层技术): 6题
- 直属领导面 (业务应用): 5题  
- 总监/架构师面 (架构设计): 5题
- HR面 (软实力): 6题

🚀 下一步: 使用 start_interview_round 工具开始面试
```

#### 6. 开始第一轮面试
```
用户: 开始第一轮技术面试

AI: 我来为你开始第一轮技术同事面试。

[调用 start_interview_round 工具，round=1]

🎯 开始 技术同事面 (底层技术)

👤 面试官: 资深前端工程师，专注于技术底层原理和基础知识考察

📝 第1/6题:
请详细解释 React Hooks 的执行顺序和 fiber 调度机制

💡 请使用 answer_interview_question 工具回答问题
参数: taskId="task-1703123456789", questionId=1, answer="你的回答"
```

#### 7. 回答问题
```
用户: 我的回答是：React Hooks 基于 fiber 架构实现，每个组件对应一个 fiber 节点...

AI: [调用 answer_interview_question 工具]

✅ 回答已记录！

📝 问题: 请详细解释 React Hooks 的执行顺序和 fiber 调度机制
💬 回答: React Hooks 基于 fiber 架构实现，每个组件对应一个 fiber 节点...

📝 下一题 (2/6):
请实现一个支持取消的防抖函数，并说明在什么场景下使用

💡 继续回答或请求追问
```

#### 8. 请求追问
```
用户: 请基于我刚才的回答生成一个追问

AI: 我来基于你的回答生成一个有针对性的追问。

[显示追问生成的 Prompt，包含原问题、用户回答和相关材料]

基于你刚才关于 React Hooks 和 fiber 的回答，我想深入了解一下：你提到了 fiber 节点，那么在实际项目中，当组件树很深且有大量 hooks 时，你是如何优化渲染性能的？特别是在处理频繁状态更新的场景下。

[调用 add_follow_up_question 工具]

✅ 追问已添加！

🔍 追问: 基于你刚才关于 React Hooks 和 fiber 的回答，我想深入了解一下：你提到了 fiber 节点，那么在实际项目中，当组件树很深且有大量 hooks 时，你是如何优化渲染性能的？

💡 请使用 answer_interview_question 工具回答追问
```

#### 9. 查看面试进度
```
用户: 查看当前面试进度

AI: [调用 get_task_status 工具]

📊 面试任务状态报告
========================================
📋 任务ID: task-1703123456789
📅 创建时间: 2024/12/21 14:30:25
🔄 当前状态: 第1轮面试进行中

📁 输入文件:
  📄 简历: /path/to/resume.pdf
  📄 职位描述: /path/to/job-description.txt

🎯 面试轮次:
  1. 技术同事面 (底层技术) (6题)
  2. 直属领导面 (业务应用) (5题)
  3. 总监/架构师面 (架构设计) (5题)
  4. HR面 (软实力) (6题)

💬 面试进度: 已回答 3 个问题

📈 各轮进度:
  第1轮: 2/6 题已完成

🚀 下一步操作:
使用 answer_interview_question 工具继续回答问题
```

### 高级使用技巧

#### 1. 批量创建任务
```bash
# 为不同公司创建多个面试任务
for company in "阿里巴巴" "腾讯" "字节跳动"; do
  echo "为 $company 创建面试任务..."
done
```

#### 2. 自定义知识库
在 `materials/` 目录下添加自己的技术材料：
```
materials/
├── algorithms/
│   └── my-custom-algorithm.md
└── knowledge-base/
    └── my-tech-stack/
        └── custom-framework.md
```

#### 3. 面试复盘
完成面试后，可以要求 AI 分析面试记录：
```
用户: 请分析我的面试表现，给出改进建议

AI: 基于你的面试记录，我来分析你的表现...
[分析回答质量、知识点掌握情况、改进建议等]
```

## 🔧 故障排除

### 常见问题

1. **MCP 服务器连接失败**
   ```bash
   # 检查构建是否成功
   cd mcps/femock
   pnpm build
   
   # 检查入口文件
   node dist/index.js
   ```

2. **任务文件找不到**
   ```bash
   # 检查 tasks 目录权限
   ls -la tasks/
   
   # 手动创建目录
   mkdir -p tasks
   ```

3. **知识库搜索无结果**
   ```bash
   # 检查 materials 目录
   ls -la materials/
   
   # 确保有 .md 文件
   find materials/ -name "*.md"
   ```

### 调试模式
设置环境变量启用详细日志：
```bash
DEBUG=femock:* node dist/index.js
```

## 🚀 扩展开发

### 添加新的面试轮次
1. 修改 `types.ts` 中的轮次定义
2. 更新 `analyzeTask.ts` 中的 Prompt 模板
3. 调整状态流转逻辑

### 集成外部 AI 服务
```typescript
// 在 analyzeTask.ts 中集成 OpenAI
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 替换模拟实现
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: prompt }]
});
```