// Core data structures for femock MCP

export interface UserInput {
  resumePath: string;
  jdPath: string;
  selfIntroductionPath?: string;
}

export interface Question {
  id: number;
  text: string;
  examPoint?: string;
  suggestedAnswer?: string;
  difficulty?: '简单' | '中等' | '困难';
}

export interface InterviewRound {
  round: number;
  title: string;
  interviewerProfile: string;
  questions: Question[];
}

export interface AnalysisOutput {
  summary: string;
  interviewRounds: InterviewRound[];
}

export interface TranscriptEntry {
  transcriptId: string;
  parentTranscriptId?: string;
  round: number;
  questionId: number | null;
  questionText: string;
  userAnswer: string;
  aiFeedback?: string;
}

export type TaskStatus = 
  | 'pending_analysis' 
  | 'analysis_complete' 
  | 'round1_inprogress' 
  | 'round1_complete'
  | 'round2_inprogress' 
  | 'round2_complete'
  | 'round3_inprogress' 
  | 'round3_complete'
  | 'hr_inprogress' 
  | 'hr_complete'
  | 'interview_complete';

export interface TaskFile {
  taskId: string;
  createdAt: string;
  status: TaskStatus;
  userInput: UserInput;
  analysisOutput?: AnalysisOutput;
  interviewTranscript: TranscriptEntry[];
}

export interface CreateOptions {
  resume?: string;
  jd?: string;
  selfIntro?: string;
}