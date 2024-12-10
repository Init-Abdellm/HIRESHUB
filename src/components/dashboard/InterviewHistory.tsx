import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

export const InterviewHistory = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('interviews')
        .select(`
          *,
          interview_sessions (
            session_type,
            sentiment_scores,
            transcription
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setInterviews(data);
      }
    };

    fetchInterviews();
  }, []);

  const viewDetails = (interviewId: string) => {
    navigate(`/interviews/${interviewId}`);
  };

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
          {interviews.map((interview) => (
            <TableRow key={interview.id}>
              <TableCell>
                {format(new Date(interview.created_at), 'PPp')}
              </TableCell>
              <TableCell className="capitalize">{interview.interview_type}</TableCell>
              <TableCell>{interview.completion_status}%</TableCell>
              <TableCell className="capitalize">{interview.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => viewDetails(interview.id)}
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