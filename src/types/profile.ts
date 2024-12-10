import { Json } from "./json";

export interface Profile {
  id: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  linkedin_data: Json | null;
  indeed_data: Json | null;
  github_data: Json | null;
  external_profiles: Json | null;
  role: 'candidate' | 'recruiter';
}