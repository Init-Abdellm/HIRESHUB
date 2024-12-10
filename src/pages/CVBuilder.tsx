import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CVForm } from "@/components/cv/CVForm";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVScanner } from "@/components/cv/CVScanner";
import { useQuery } from "@tanstack/react-query";
import { databases, DATABASE_ID, COLLECTIONS, account } from "@/integrations/appwrite/client";
import { Loader2 } from "lucide-react";
import { ProfileDataFetcher } from "@/components/auth/ProfileDataFetcher";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";

const CVBuilder = () => {
  const [activeCV, setActiveCV] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
      } catch (error) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: cvs, isLoading } = useQuery({
    queryKey: ['cvs'],
    queryFn: async () => {
      const session = await account.get();
      if (!session) throw new Error('Not authenticated');

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CVS,
        [
          Query.equal('user_id', session.$id),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileDataFetcher />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CV Builder</h1>
        <Button
          onClick={() => setActiveCV(null)}
          variant="outline"
        >
          Create New CV
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <CVForm
            activeCV={activeCV}
            onSave={(cv) => {
              setActiveCV(cv);
              toast({
                title: "Success",
                description: "CV saved successfully",
              });
            }}
          />
        </div>
        <div className="lg:sticky lg:top-8 space-y-8">
          <CVPreview cv={activeCV} />
          {activeCV && <CVScanner cvId={activeCV.$id} />}
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;