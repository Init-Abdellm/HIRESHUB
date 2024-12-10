import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { useQueryClient } from "@tanstack/react-query";
import { ID } from "appwrite";

interface InterviewSchedulerProps {
  candidateId: string;
  candidateEmail: string;
  onScheduled: () => void;
}

export const InterviewScheduler = ({ candidateId, candidateEmail, onScheduled }: InterviewSchedulerProps) => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
  ];

  const handleSchedule = async () => {
    if (!date || !timeSlot) {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledAt = new Date(date);
      const [hours, minutes] = timeSlot.split(':');
      scheduledAt.setHours(parseInt(hours), parseInt(minutes));

      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.INTERVIEWS,
        ID.unique(),
        {
          candidate_id: candidateId,
          candidate_email: candidateEmail,
          scheduled_at: scheduledAt.toISOString(),
          status: 'scheduled'
        }
      );

      toast({
        title: "Success",
        description: "Interview scheduled successfully",
      });

      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      onScheduled();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Interview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
            />
          </div>
          <div>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleSchedule} 
            disabled={isSubmitting || !date || !timeSlot}
            className="w-full"
          >
            {isSubmitting ? "Scheduling..." : "Schedule Interview"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
