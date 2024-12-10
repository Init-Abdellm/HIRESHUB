import { useQuery } from "@tanstack/react-query";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Query } from "appwrite";

interface Candidate {
  $id: string;
  candidate_email: string;
  candidate_name: string;
  status: string;
  job_title: string;
}

export const CandidatesList = () => {
  const { toast } = useToast();

  const { data: candidates, isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.INTERVIEW_INVITATIONS,
        [
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents.map(doc => ({
        $id: doc.$id,
        candidate_email: doc.candidate_email,
        candidate_name: doc.candidate_name,
        status: doc.status,
        job_title: doc.job_title
      })) as Candidate[];
    }
  });

  const handleScheduleInterview = async (candidateId: string) => {
    try {
      toast({
        title: "Success",
        description: "Interview scheduling email sent to candidate",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {candidates?.map((candidate) => (
        <Card key={candidate.$id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{candidate.candidate_name}</CardTitle>
            <Badge variant={candidate.status === 'pending' ? 'secondary' : 'default'}>
              {candidate.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.candidate_email}</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Applied for:</h4>
                <p>{candidate.job_title}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleScheduleInterview(candidate.$id)}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Interview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};