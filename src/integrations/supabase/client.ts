// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://bfvvrxrwfqenlxtoonwp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdnZyeHJ3ZnFlbmx4dG9vbndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyODAzMDUsImV4cCI6MjA0ODg1NjMwNX0.wWtkRnf4-LuzdY7DuzTHyhMQ3OnaYVamVSYntGApkj4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);