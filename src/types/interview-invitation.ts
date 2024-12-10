export interface InterviewInvitation {
  id: string;
  recruiter_id: string | null;
  company_id: string | null;
  candidate_email: string;
  candidate_name: string;
  job_title: string;
  job_description: string | null;
  status: 'pending' | 'accepted' | 'rejected';
  interview_id: string | null;
  created_at: string;
  updated_at: string;
}