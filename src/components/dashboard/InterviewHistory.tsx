import { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Query } from "appwrite";
import { useQuery } from "@tanstack/react-query";

export const InterviewHistory = () => {
  const navigate = useNavigate();

  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.INTERVIEWS,
        [
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents;
    }
  });

  const viewDetails = (interviewId: string) => {
    navigate(`/interviews/${interviewId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interview History</h2>
        <Button onClick={() => navigate('/interviews/new')}>
          Start New Interview
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews?.map((interview) => (
            <TableRow key={interview.$id}>
              <TableCell>
                {format(new Date(interview.$createdAt), 'PPp')}
              </TableCell>
              <TableCell className="capitalize">{interview.interview_type}</TableCell>
              <TableCell>{interview.completion_status}%</TableCell>
              <TableCell className="capitalize">{interview.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => viewDetails(interview.$id)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};