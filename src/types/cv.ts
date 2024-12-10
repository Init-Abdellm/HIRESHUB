import { Json } from "./json";

export interface CV {
  id: string;
  user_id: string | null;
  title: string;
  content: Json;
  is_ats_optimized: boolean | null;
  created_at: string;
  updated_at: string;
}