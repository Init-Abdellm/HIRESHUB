export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          content: Json
          created_at: string
          description: string | null
          id: string
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cv_suggestions: {
        Row: {
          created_at: string
          cv_id: string | null
          field_name: string
          id: string
          original_content: string | null
          suggestions: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          cv_id?: string | null
          field_name: string
          id?: string
          original_content?: string | null
          suggestions: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          cv_id?: string | null
          field_name?: string
          id?: string
          original_content?: string | null
          suggestions?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_suggestions_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "cvs"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          preview_url: string | null
          style_config: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          preview_url?: string | null
          style_config: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          preview_url?: string | null
          style_config?: Json
          updated_at?: string
        }
        Relationships: []
      }
      cvs: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_ats_optimized: boolean | null
          is_public: boolean | null
          keywords: string[] | null
          last_generated_at: string | null
          sections_order: string[] | null
          style_preferences: Json | null
          template_id: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          is_ats_optimized?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          last_generated_at?: string | null
          sections_order?: string[] | null
          style_preferences?: Json | null
          template_id?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_ats_optimized?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          last_generated_at?: string | null
          sections_order?: string[] | null
          style_preferences?: Json | null
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cvs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          completed: boolean | null
          course_id: string | null
          created_at: string
          id: string
          progress: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          category_id: string | null
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_invitations: {
        Row: {
          candidate_email: string
          candidate_name: string
          company_id: string | null
          created_at: string
          id: string
          interview_id: string | null
          job_description: string | null
          job_title: string
          recruiter_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          candidate_email: string
          candidate_name: string
          company_id?: string | null
          created_at?: string
          id?: string
          interview_id?: string | null
          job_description?: string | null
          job_title: string
          recruiter_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          candidate_email?: string
          candidate_name?: string
          company_id?: string | null
          created_at?: string
          id?: string
          interview_id?: string | null
          job_description?: string | null
          job_title?: string
          recruiter_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_invitations_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_invitations_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_questions: {
        Row: {
          answer: string | null
          created_at: string
          feedback: string | null
          id: string
          interview_id: string | null
          order_number: number
          question: string
          updated_at: string
        }
        Insert: {
          answer?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          interview_id?: string | null
          order_number: number
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          interview_id?: string | null
          order_number?: number
          question?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_questions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sessions: {
        Row: {
          created_at: string
          id: string
          interview_id: string | null
          model_name: string | null
          model_type: string
          sentiment_scores: Json | null
          session_type: string
          transcription: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          interview_id?: string | null
          model_name?: string | null
          model_type: string
          sentiment_scores?: Json | null
          session_type: string
          transcription?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          interview_id?: string | null
          model_name?: string | null
          model_type?: string
          sentiment_scores?: Json | null
          session_type?: string
          transcription?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_sessions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_settings: {
        Row: {
          created_at: string
          evaluation_criteria: Json | null
          id: string
          job_description: string | null
          job_role: string
          preferred_mode: string[] | null
          question_difficulty: string | null
          recruiter_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          evaluation_criteria?: Json | null
          id?: string
          job_description?: string | null
          job_role: string
          preferred_mode?: string[] | null
          question_difficulty?: string | null
          recruiter_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          evaluation_criteria?: Json | null
          id?: string
          job_description?: string | null
          job_role?: string
          preferred_mode?: string[] | null
          question_difficulty?: string | null
          recruiter_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_settings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          completion_status: number | null
          created_at: string
          cv_id: string | null
          feedback: string | null
          id: string
          interview_type: Database["public"]["Enums"]["interview_type"] | null
          job_description: string | null
          job_role: string | null
          keywords_analysis: Json | null
          mode: string | null
          preparation_complete: boolean | null
          preparation_notes: Json | null
          scheduled_at: string
          score: number | null
          status: string | null
          strengths: Json | null
          time_limit: number | null
          updated_at: string
          user_id: string | null
          weaknesses: Json | null
        }
        Insert: {
          completion_status?: number | null
          created_at?: string
          cv_id?: string | null
          feedback?: string | null
          id?: string
          interview_type?: Database["public"]["Enums"]["interview_type"] | null
          job_description?: string | null
          job_role?: string | null
          keywords_analysis?: Json | null
          mode?: string | null
          preparation_complete?: boolean | null
          preparation_notes?: Json | null
          scheduled_at: string
          score?: number | null
          status?: string | null
          strengths?: Json | null
          time_limit?: number | null
          updated_at?: string
          user_id?: string | null
          weaknesses?: Json | null
        }
        Update: {
          completion_status?: number | null
          created_at?: string
          cv_id?: string | null
          feedback?: string | null
          id?: string
          interview_type?: Database["public"]["Enums"]["interview_type"] | null
          job_description?: string | null
          job_role?: string | null
          keywords_analysis?: Json | null
          mode?: string | null
          preparation_complete?: boolean | null
          preparation_notes?: Json | null
          scheduled_at?: string
          score?: number | null
          status?: string | null
          strengths?: Json | null
          time_limit?: number | null
          updated_at?: string
          user_id?: string | null
          weaknesses?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "cvs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          recruiter_id: string | null
          requirements: string[] | null
          salary_range: Json | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          recruiter_id?: string | null
          requirements?: string[] | null
          salary_range?: Json | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          recruiter_id?: string | null
          requirements?: string[] | null
          salary_range?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_postings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      local_models: {
        Row: {
          created_at: string
          download_url: string | null
          id: string
          local_path: string | null
          model_type: string
          name: string
          source: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          download_url?: string | null
          id?: string
          local_path?: string | null
          model_type: string
          name: string
          source: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          download_url?: string | null
          id?: string
          local_path?: string | null
          model_type?: string
          name?: string
          source?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          external_profiles: Json | null
          full_name: string | null
          github_data: Json | null
          id: string
          indeed_data: Json | null
          industry: string | null
          job_title: string | null
          linkedin_data: Json | null
          location: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          external_profiles?: Json | null
          full_name?: string | null
          github_data?: Json | null
          id: string
          indeed_data?: Json | null
          industry?: string | null
          job_title?: string | null
          linkedin_data?: Json | null
          location?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          external_profiles?: Json | null
          full_name?: string | null
          github_data?: Json | null
          id?: string
          indeed_data?: Json | null
          industry?: string | null
          job_title?: string | null
          linkedin_data?: Json | null
          location?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      recruiter_companies: {
        Row: {
          company_id: string
          created_at: string
          recruiter_id: string
          role: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          recruiter_id: string
          role?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          recruiter_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_companies_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_recommendations: {
        Row: {
          created_at: string
          id: string
          priority: number | null
          reason: string | null
          skill_name: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          priority?: number | null
          reason?: string | null
          skill_name: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          priority?: number | null
          reason?: string | null
          skill_name?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          id: string
          plan: string | null
          status: string | null
          updated_at: string
          user_id: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          plan?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          plan?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      interview_type: "technical" | "behavioral" | "leadership"
      user_role: "candidate" | "recruiter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
