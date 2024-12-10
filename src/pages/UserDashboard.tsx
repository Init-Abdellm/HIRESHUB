import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewHistory } from "@/components/dashboard/InterviewHistory";
import { CVLibrary } from "@/components/dashboard/CVLibrary";
import { ProfileOverview } from "@/components/dashboard/ProfileOverview";
import { Card } from "@/components/ui/card";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="cvs">CVs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <ProfileOverview />
          </Card>
        </TabsContent>

        <TabsContent value="interviews">
          <Card className="p-6">
            <InterviewHistory />
          </Card>
        </TabsContent>

        <TabsContent value="cvs">
          <Card className="p-6">
            <CVLibrary />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;