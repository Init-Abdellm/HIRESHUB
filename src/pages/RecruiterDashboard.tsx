import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { databases, account, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, BriefcaseBusiness, ChartBar } from "lucide-react";
import { JobPostingForm } from "@/components/recruiter/JobPostingForm";
import { JobPostingsList } from "@/components/recruiter/JobPostingsList";
import { CandidatesList } from "@/components/recruiter/CandidatesList";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await account.get();
        if (!session) {
          navigate('/login');
          return;
        }

        const profile = await databases.getDocument(
          DATABASE_ID,
          COLLECTIONS.PROFILES,
          session.$id
        );

        if (profile.role !== 'recruiter') {
          toast({
            title: "Access Denied",
            description: "This area is only accessible to recruiters.",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  const { data: stats } = useQuery({
    queryKey: ['recruiterStats'],
    queryFn: async () => {
      const [jobPostings, interviews, candidates] = await Promise.all([
        databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.JOB_POSTINGS,
          [Query.equal('status', 'active')]
        ),
        databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.INTERVIEWS,
          [Query.equal('status', 'scheduled')]
        ),
        databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.INTERVIEW_INVITATIONS
        )
      ]);

      const totalCandidates = candidates.documents.length;
      const respondedCandidates = candidates.documents.filter(c => c.status !== 'pending').length;
      const responseRate = totalCandidates ? (respondedCandidates / totalCandidates) * 100 : 0;

      return {
        activeJobs: jobPostings.documents.length,
        scheduledInterviews: interviews.documents.length,
        totalCandidates,
        responseRate: responseRate.toFixed(1)
      };
    }
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeJobs || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCandidates || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.scheduledInterviews || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.responseRate || 0}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="postings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="postings">Job Postings</TabsTrigger>
          <TabsTrigger value="create">Create Job</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList>
        <TabsContent value="postings">
          <JobPostingsList />
        </TabsContent>
        <TabsContent value="create">
          <JobPostingForm />
        </TabsContent>
        <TabsContent value="candidates">
          <CandidatesList />
        </TabsContent>
      </Tabs>
    </div>
  );
}