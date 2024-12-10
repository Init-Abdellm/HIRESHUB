import { Json } from "./json";

export interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number;
  content: Json;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string | null;
  course_id: string | null;
  progress: number | null;
  completed: boolean | null;
  created_at: string;
  updated_at: string;
}