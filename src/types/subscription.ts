export interface Subscription {
  id: string;
  user_id: string | null;
  plan: string | null;
  status: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}