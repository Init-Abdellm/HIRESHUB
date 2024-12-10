import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CVForm } from "@/components/cv/CVForm";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVScanner } from "@/components/cv/CVScanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ProfileDataFetcher } from "@/components/auth/ProfileDataFetcher";
import { useNavigate } from "react-router-dom";

const CVBuilder = () => {
  const [activeCV, setActiveCV] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: cvs, isLoading } = useQuery({
    queryKey: ['cvs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
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
          {activeCV && <CVScanner cvId={activeCV.id} />}
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;