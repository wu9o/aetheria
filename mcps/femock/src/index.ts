#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createInterviewTask } from './tools/createTask.js';
import { analyzeTaskPhase1, analyzeTaskPhase2, saveAnalysisResult } from './tools/analyzeTask.js';
import { startInterview } from './tools/startInterview.js';
import { getTaskStatus } from './tools/getStatus.js';
import { answerQuestion, addFollowUpQuestion } from './tools/answerQuestion.js';

const server = new Server(
  {
    name: 'femock',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 定义 MCP 工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_interview_task',
        description: '创建一个新的模拟面试任务，需要提供简历和职位描述文件路径',
        inputSchema: {
          type: 'object',
          properties: {
            resumePath: {
              type: 'string',
              description: '简历文件路径'
            },
            jdPath: {
              type: 'string', 
              description: '职位描述文件路径'
            },
            selfIntroPath: {
              type: 'string',
              description: '自我介绍文件路径（可选）'
            }
          },
          required: ['resumePath', 'jdPath']
        }
      },
      {
        name: 'analyze_task_phase1',
        description: '第一阶段分析：提取简历和JD中的关键技术点，为面试问题生成做准备',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            }
          },
          required: ['taskId']
        }
      },
      {
        name: 'analyze_task_phase2',
        description: '第二阶段分析：基于关键词搜索知识库，生成具体的面试问题',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            },
            keywords: {
              type: 'array',
              items: { type: 'string' },
              description: '从第一阶段分析得出的关键技术词汇'
            },
            interviewFocus: {
              type: 'object',
              description: '各轮面试的重点方向',
              properties: {
                round1: { type: 'string', description: '第1轮技术基础面试重点' },
                round2: { type: 'string', description: '第2轮业务应用面试重点' },
                round3: { type: 'string', description: '第3轮架构设计面试重点' },
                round4: { type: 'string', description: '第4轮HR面试重点' }
              },
              required: ['round1', 'round2', 'round3', 'round4']
            }
          },
          required: ['taskId', 'keywords', 'interviewFocus']
        }
      },
      {
        name: 'start_interview_round',
        description: '开始指定轮次的面试',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            },
            round: {
              type: 'number',
              description: '面试轮次 (1-4, 其中4为HR面)',
              minimum: 1,
              maximum: 4
            }
          },
          required: ['taskId', 'round']
        }
      },
      {
        name: 'answer_interview_question',
        description: '回答面试问题',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            },
            questionId: {
              type: 'number',
              description: '问题ID'
            },
            answer: {
              type: 'string',
              description: '用户的回答'
            },
            requestFollowUp: {
              type: 'boolean',
              description: '是否请求追问',
              default: false
            }
          },
          required: ['taskId', 'questionId', 'answer']
        }
      },
      {
        name: 'save_analysis_result',
        description: '保存第二阶段分析生成的面试问题到任务文件',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            },
            analysisResult: {
              type: 'object',
              description: '分析结果，包含4轮面试的问题',
              properties: {
                round1: { type: 'object' },
                round2: { type: 'object' },
                round3: { type: 'object' },
                round4: { type: 'object' }
              },
              required: ['round1', 'round2', 'round3', 'round4']
            }
          },
          required: ['taskId', 'analysisResult']
        }
      },
      {
        name: 'add_follow_up_question',
        description: '添加面试追问到当前轮次',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            },
            parentTranscriptId: {
              type: 'string',
              description: '原问题的记录ID'
            },
            followUpQuestion: {
              type: 'string',
              description: '追问内容'
            }
          },
          required: ['taskId', 'parentTranscriptId', 'followUpQuestion']
        }
      },
      {
        name: 'get_task_status',
        description: '获取面试任务的当前状态和进度',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: '任务ID'
            }
          },
          required: ['taskId']
        }
      }
    ]
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request:any) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_interview_task':
        return await createInterviewTask(args);
      
      case 'analyze_task_phase1':
        return await analyzeTaskPhase1(args);
      
      case 'analyze_task_phase2':
        return await analyzeTaskPhase2(args);
      
      case 'save_analysis_result':
        return await saveAnalysisResult(args.taskId, args.analysisResult);
      
      case 'start_interview_round':
        return await startInterview(args);
      
      case 'answer_interview_question':
        return await answerQuestion(args);
      
      case 'add_follow_up_question':
        return await addFollowUpQuestion(args);
      
      case 'get_task_status':
        return await getTaskStatus(args);
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }
      ]
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Femock MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
