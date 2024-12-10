import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

export const RoleSelector = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = async (role: 'candidate' | 'recruiter') => {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PROFILES,
        ID.unique(),
        { role }
      );

      if (!document) throw new Error("Failed to set role");

      toast({
        title: "Success",
        description: `Your account has been set up as a ${role}`,
      });

      navigate('/');
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to set role. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-primary-50 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Role</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRoleSelect('candidate')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Job Seeker
              </CardTitle>
              <CardDescription>I want to find job opportunities and prepare for interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Create ATS-optimized CVs</li>
                <li>• Practice with AI interviews</li>
                <li>• Get personalized feedback</li>
                <li>• Track your progress</li>
              </ul>
              <Button className="w-full mt-4">Continue as Job Seeker</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRoleSelect('recruiter')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Recruiter
              </CardTitle>
              <CardDescription>I want to streamline my hiring process</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Send bulk interview invitations</li>
                <li>• Get AI-powered candidate analysis</li>
                <li>• Track recruitment progress</li>
                <li>• Access detailed reports</li>
              </ul>
              <Button className="w-full mt-4">Continue as Recruiter</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};