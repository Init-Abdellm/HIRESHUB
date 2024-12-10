import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { ID } from "appwrite";

export const ProfileDataFetcher = () => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchExternalData = async () => {
      try {
        const profile = await databases.getDocument(
          DATABASE_ID,
          COLLECTIONS.PROFILES,
          ID.unique()
        );

        if (!profile) {
          // Create new profile if it doesn't exist
          await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            ID.unique(),
            {
              full_name: "",
              avatar_url: "",
              role: 'candidate'
            }
          );
        }

        toast({
          title: "Profile Updated",
          description: "Your professional data has been successfully imported.",
        });
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