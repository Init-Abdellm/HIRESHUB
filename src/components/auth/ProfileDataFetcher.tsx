import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ProfileDataFetcher = () => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchExternalData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user found");
          return;
        }

        console.log("Fetching profile for user:", user.id);
        
        // First try to get the profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(); // Use maybeSingle instead of single to avoid 406 error

        // If no profile exists, create one
        if (!profile && (!profileError || profileError.code === 'PGRST116')) {
          console.log("Creating new profile for user:", user.id);
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id,
                full_name: user.user_metadata.full_name,
                avatar_url: user.user_metadata.avatar_url,
                role: 'candidate'
              }
            ])
            .select()
            .single();

          if (insertError) {
            console.error("Error creating profile:", insertError);
            throw insertError;
          }

          console.log("New profile created:", newProfile);
        } else if (profileError && profileError.code !== 'PGRST116') {
          console.error("Error fetching profile:", profileError);
          throw profileError;
        }

        // Only fetch external data if we don't have it yet
        const currentProfile = profile || await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          .then(res => res.data);

        if (!currentProfile?.linkedin_data || !currentProfile?.github_data) {
          console.log("Fetching external profile data");
          
          const { data: updatedProfile, error } = await supabase.functions.invoke('fetch-profile-data', {
            body: { userId: user.id }
          });

          if (error) {
            console.error("Error fetching external profile data:", error);
            throw error;
          }

          toast({
            title: "Profile Updated",
            description: "Your professional data has been successfully imported.",
          });
        }
      } catch (error: any) {
        console.error("Error in profile data fetcher:", error);
        toast({
          title: "Data Sync Error",
          description: "Failed to sync your professional data. Some features may be limited.",
          variant: "destructive",
        });
      }
    };

    fetchExternalData();
  }, [toast]);

  return null;
};