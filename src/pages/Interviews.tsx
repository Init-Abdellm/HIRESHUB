import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { databases, DATABASE_ID, COLLECTIONS, account } from "@/integrations/appwrite/client";
import { useNavigate } from "react-router-dom";
import { InterviewSession } from "@/components/interview/InterviewSession";
import { Interview, InterviewType } from "@/types/interview";
import { ID } from "appwrite";
import { useQuery } from "@tanstack/react-query";

const Interviews = () => {
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [interviewer, setInterviewer] = useState<InterviewType>("technical");
  const [currentInterviewId, setCurrentInterviewId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
      } catch {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: cvOptions } = useQuery({
    queryKey: ['cv-options'],
    queryFn: async () => {
      const session = await account.get();
      if (!session) throw new Error('Not authenticated');

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CVS,
        []
      );

      return response.documents.map(cv => ({
        id: cv.$id,
        title: cv.title
      }));
    }
  });

  const createNewInterview = async () => {
    try {
      const session = await account.get();
      if (!session) throw new Error('Not authenticated');

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.INTERVIEWS,
        ID.unique(),
        {
          user_id: session.$id,
          cv_id: selectedCV,
          interview_type: interviewer,
          scheduled_at: new Date().toISOString(),
          status: 'in_progress'
        }
      );

      setCurrentInterviewId(response.$id);
      toast({
        title: "Interview Started",
        description: "Your interview session has been created.",
      });

    } catch (error) {
      console.error('Error creating interview:', error);
      toast({
        title: "Error",
        description: "Failed to start interview.",
        variant: "destructive",
      });
    }
  };

  const handleSessionComplete = () => {
    setCurrentInterviewId(null);
    toast({
      title: "Interview Completed",
      description: "Your interview has been saved successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl font-bold">AI Interview Practice</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedCV || ''} onValueChange={setSelectedCV}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select your CV" />
              </SelectTrigger>
              <SelectContent>
                {cvOptions?.map((cv) => (
                  <SelectItem key={cv.id} value={cv.id}>
                    {cv.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={interviewer} 
              onValueChange={(value: InterviewType) => setInterviewer(value)}
              disabled={currentInterviewId !== null}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select interviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!currentInterviewId ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Select your CV and interview type to begin. The AI will conduct an interview based on your experience.
            </p>
            <Button 
              onClick={createNewInterview}
              disabled={!selectedCV}
            >
              Start Interview
            </Button>
          </Card>
        ) : (
          <InterviewSession
            interviewId={currentInterviewId}
            onSessionComplete={handleSessionComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Interviews;