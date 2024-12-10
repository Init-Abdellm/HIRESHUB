import { Json } from "./json";

export type InterviewType = 'technical' | 'behavioral' | 'leadership';

export interface Interview {
  id: string;
  user_id: string | null;
  cv_id: string | null;
  scheduled_at: string;
  status: string | null;
  feedback: string | null;
  created_at: string;
  updated_at: string;
  interview_type: InterviewType | null;
  completion_status: number | null;
  preparation_complete: boolean | null;
  preparation_notes: Json | null;
}

export interface InterviewQuestion {
  id: string;
  interview_id: string | null;
  question: string;
  answer: string | null;
  feedback: string | null;
  order_number: number;
  created_at: string;
  updated_at: string;
}

export interface InterviewSession {
  id: string;
  interview_id: string | null;
  session_type: 'text' | 'audio' | 'video';
  sentiment_scores: Json | null;
  transcription: string | null;
  model_type: 'openai' | 'local';
  model_name: string | null;
  created_at: string;
  updated_at: string;
}