# Femock - 前端模拟面试 MCP 服务器

一个基于 Model Context Protocol (MCP) 的前端模拟面试工具，通过 AI 驱动的多轮面试流程，帮助前端开发者提升面试表现。

## 🎯 核心特性

- **AI 驱动的问题生成**: 基于简历、JD 和知识库智能生成面试问题
- **多轮面试模拟**: 涵盖技术基础、业务应用、架构设计、软实力四个维度
- **知识库增强**: 利用算法题库和技术知识库提升问题质量
- **动态追问**: 支持基于回答内容的深度追问
- **完整记录**: 保存所有面试过程和回答内容

## 🏗️ 架构设计

### MCP 工具架构

```
femock MCP Server
├── 任务管理工具
│   ├── create_interview_task     # 创建面试任务
│   └── get_task_status          # 查看任务状态
├── 分析工具 (两阶段)
│   ├── analyze_task_phase1      # 第一阶段：提取关键词和面试重点
│   ├── analyze_task_phase2      # 第二阶段：基于知识库生成具体问题
│   └── save_analysis_result     # 保存分析结果
└── 面试进行工具
    ├── start_interview_round    # 开始指定轮次面试
    ├── answer_interview_question # 回答面试问题
    └── add_follow_up_question   # 添加追问
```

### 数据流架构

```
1. 创建任务 → 2. 第一阶段分析 → 3. 第二阶段分析 → 4. 开始面试 → 5. 回答问题
     ↓              ↓                ↓               ↓            ↓
  task.json    提取关键词        生成具体问题      展示问题     记录回答
                面试重点          搜索知识库        
```

### 核心数据结构

```typescript
interface TaskFile {
  taskId: string;                    // 任务唯一标识
  createdAt: string;                 // 创建时间
  status: TaskStatus;                // 当前状态
  userInput: UserInput;              // 用户输入文件
  analysisOutput?: AnalysisOutput;   // 分析结果
  interviewTranscript: TranscriptEntry[]; // 面试记录
}

interface Question {
  id: number;
  text: string;                      // 问题内容
  examPoint?: string;                // 考察要点
  suggestedAnswer?: string;          // 推荐回答
  difficulty?: '简单' | '中等' | '困难';
}
```

## 🚀 使用流程

### 1. 创建面试任务

```typescript
// 使用 create_interview_task 工具
{
  "resumePath": "/path/to/resume.pdf",
  "jdPath": "/path/to/job-description.txt",
  "selfIntroPath": "/path/to/self-intro.txt" // 可选
}
```

### 2. 第一阶段分析

```typescript
// 使用 analyze_task_phase1 工具
{
  "taskId": "task-1693456800"
}
```

AI 会收到包含简历、JD 内容的 Prompt，需要提取：
- 10-15个关键技术词汇
- 各轮面试的重点方向

### 3. 第二阶段分析

```typescript
// 使用 analyze_task_phase2 工具
{
  "taskId": "task-1693456800",
  "keywords": ["React", "TypeScript", "性能优化", ...],
  "interviewFocus": {
    "round1": "重点考察 React Hooks、TypeScript 类型系统等基础",
    "round2": "重点考察组件设计、性能优化实践经验",
    "round3": "重点考察前端架构、团队协作能力",
    "round4": "重点考察职业规划、学习能力"
  }
}
```

AI 会基于关键词搜索知识库，生成具体的面试问题。

### 4. 保存分析结果

```typescript
// 使用 save_analysis_result 工具
{
  "taskId": "task-1693456800",
  "analysisResult": {
    "round1": {
      "title": "技术同事面 (底层技术)",
      "questions": [
        {
          "id": 1,
          "text": "请解释 React Hooks 的执行顺序和原理",
          "examPoint": "考察对 React 底层机制的理解",
          "suggestedAnswer": "应该提到 fiber、调度、依赖数组等",
          "difficulty": "中等"
        }
      ]
    }
    // ... round2, round3, round4
  }
}
```

### 5. 开始面试

```typescript
// 使用 start_interview_round 工具
{
  "taskId": "task-1693456800",
  "round": 1
}
```

### 6. 回答问题

```typescript
// 使用 answer_interview_question 工具
{
  "taskId": "task-1693456800",
  "questionId": 1,
  "answer": "React Hooks 的执行顺序...",
  "requestFollowUp": true // 可选，请求追问
}
```

### 7. 添加追问（可选）

```typescript
// 使用 add_follow_up_question 工具
{
  "taskId": "task-1693456800",
  "parentTranscriptId": "t1693456801",
  "followUpQuestion": "能详细说明一下 useEffect 的清理机制吗？"
}
```

## 📁 项目结构

```
mcps/femock/
├── src/
│   ├── index.ts              # MCP 服务器入口
│   ├── types.ts              # 类型定义
│   ├── lib/
│   │   ├── fileUtils.ts      # 文件操作工具
│   │   └── materialsSearch.ts # 知识库搜索
│   └── tools/                # MCP 工具实现
│       ├── createTask.ts     # 创建任务
│       ├── analyzeTask.ts    # 分析任务（两阶段）
│       ├── startInterview.ts # 开始面试
│       ├── answerQuestion.ts # 回答问题
│       └── getStatus.ts      # 状态查询
├── materials/                # 知识库
│   ├── algorithms/           # 算法题库
│   └── knowledge-base/       # 技术知识库
├── tasks/                    # 任务文件存储
├── package.json
└── README.md
```

## 🎭 面试轮次设计

### 第1轮 - 技术同事面（底层技术）
- **面试官角色**: 资深前端工程师
- **考察重点**: JavaScript 核心、CSS 深度、框架原理、算法
- **问题特点**: 技术深度、原理理解、必含算法题

### 第2轮 - 直属领导面（业务应用）
- **面试官角色**: 技术团队 Leader
- **考察重点**: 业务问题解决、项目经验、技术选型
- **问题特点**: 实践导向、结合简历项目

### 第3轮 - 总监/架构师面（架构设计）
- **面试官角色**: 技术总监/架构师
- **考察重点**: 架构设计、技术领导力、系统思维
- **问题特点**: 开放性强、考察全局观

### 第4轮 - HR面（软实力）
- **面试官角色**: 人力资源专员
- **考察重点**: 职业规划、团队协作、文化匹配
- **问题特点**: 行为面试法、软技能评估

## 🔄 状态流转

```
pending_analysis → analysis_complete → round1_inprogress → round1_complete
                                    → round2_inprogress → round2_complete
                                    → round3_inprogress → round3_complete
                                    → hr_inprogress → hr_complete
                                    → interview_complete
```

## 📚 知识库结构

```
materials/
├── algorithms/               # 前端算法题库
│   ├── debounce.md          # 防抖函数
│   ├── throttle.md          # 节流函数
│   └── ...
└── knowledge-base/          # 技术知识库
    ├── frontend-architecture/
    ├── web-performance/
    ├── mobile-web/
    └── mini-program/
```

## 🛠️ 开发和部署

### 安装依赖
```bash
pnpm install
```

### 构建项目
```bash
pnpm build
```

### 运行 MCP 服务器
```bash
node dist/index.js
```

## 🔧 配置 MCP 客户端

在 Kiro 或其他支持 MCP 的 AI 编辑器中配置：

```json
{
  "mcpServers": {
    "femock": {
      "command": "node",
      "args": ["/path/to/femock/dist/index.js"],
      "env": {}
    }
  }
}
```

## 💡 使用示例

1. **创建任务**: "请使用 femock 为我创建一个面试任务，简历在 ./resume.pdf，JD 在 ./jd.txt"

2. **开始分析**: "请分析这个面试任务，提取关键技术点"

3. **生成问题**: "基于这些关键词，生成具体的面试问题"

4. **开始面试**: "开始第一轮技术面试"

5. **回答问题**: "我的回答是..."

6. **请求追问**: "请基于我的回答生成一个追问"

## 🎯 设计优势

1. **AI 协作**: 充分利用 AI 编辑器的能力，而不是替代
2. **分阶段处理**: 避免单次 AI 调用过于复杂
3. **知识库驱动**: 基于结构化知识生成高质量问题
4. **完整记录**: 保存所有面试过程，便于复盘
5. **灵活扩展**: 模块化设计，易于添加新功能

## 🔮 未来规划

- [ ] 集成真实 AI 服务（OpenAI/Claude）进行自动问题生成
- [ ] 添加面试表现评分功能
- [ ] 支持更多编程语言和技术栈
- [ ] 添加面试报告生成
- [ ] 支持团队协作和面试官培训模式