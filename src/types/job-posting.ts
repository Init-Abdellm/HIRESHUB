import { Json } from "./json";

export interface JobPosting {
  id: string;
  recruiter_id: string | null;
  company_id: string | null;
  title: string;
  description: string | null;
  requirements: string[] | null;
  location: string | null;
  salary_range: {
    min: number;
    max: number;
  } | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}