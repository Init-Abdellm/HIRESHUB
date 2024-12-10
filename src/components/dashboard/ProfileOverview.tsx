import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { databases, DATABASE_ID, COLLECTIONS, account } from "@/integrations/appwrite/client";
import { Query } from "appwrite";
import { useQuery } from "@tanstack/react-query";

export const ProfileOverview = () => {
  const { data: stats } = useQuery({
    queryKey: ['profile-stats'],
    queryFn: async () => {
      const session = await account.get();
      if (!session) throw new Error('Not authenticated');

      const [interviewsResponse, cvsResponse] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.INTERVIEWS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.CVS)
      ]);

      const avgScore = interviewsResponse.documents.reduce((acc, interview) => 
        acc + (interview.completion_status || 0), 0) / (interviewsResponse.documents.length || 1);

      return {
        totalInterviews: interviewsResponse.documents.length,
        averageScore: Math.round(avgScore),
        cvCount: cvsResponse.documents.length
      };
    }
  });

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const session = await account.get();
      if (!session) throw new Error('Not authenticated');

      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.PROFILES,
        session.$id
      );
      return response;
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Interviews</h3>
          <p className="text-2xl">{stats?.totalInterviews || 0}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Average Score</h3>
          <Progress value={stats?.averageScore || 0} className="mt-2" />
          <p className="text-sm mt-1">{stats?.averageScore || 0}%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">CVs Created</h3>
          <p className="text-2xl">{stats?.cvCount || 0}</p>
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