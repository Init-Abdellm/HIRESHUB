import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

export const ProfileOverview = () => {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    cvCount: 0
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileData, interviewsData, cvsData] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('interviews').select('*').eq('user_id', user.id),
        supabase.from('cvs').select('*').eq('user_id', user.id)
      ]);

      if (profileData.data) {
        setProfile(profileData.data);
      }

      if (interviewsData.data && cvsData.data) {
        const avgScore = interviewsData.data.reduce((acc, interview) => 
          acc + (interview.completion_status || 0), 0) / (interviewsData.data.length || 1);

        setStats({
          totalInterviews: interviewsData.data.length,
          averageScore: Math.round(avgScore),
          cvCount: cvsData.data.length
        });
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Interviews</h3>
          <p className="text-2xl">{stats.totalInterviews}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Average Score</h3>
          <Progress value={stats.averageScore} className="mt-2" />
          <p className="text-sm mt-1">{stats.averageScore}%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">CVs Created</h3>
          <p className="text-2xl">{stats.cvCount}</p>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p>{profile?.full_name || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Industry</p>
            <p>{profile?.industry || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p>{profile?.location || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Title</p>
            <p>{profile?.job_title || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};