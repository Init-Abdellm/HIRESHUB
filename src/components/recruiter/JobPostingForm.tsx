import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { ID } from "appwrite";

export const JobPostingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.JOB_POSTINGS,
        ID.unique(),
        {
          title,
          description,
          location,
          requirements: requirements.split('\n').filter(r => r.trim()),
          salary_range: {
            min: parseInt(minSalary),
            max: parseInt(maxSalary)
          }
        }
      );

      toast({
        title: "Success",
        description: "Job posting created successfully",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setRequirements("");
      setMinSalary("");
      setMaxSalary("");

      queryClient.invalidateQueries({ queryKey: ['jobPostings'] });

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
        <CardTitle>Create New Job Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Requirements (one per line)"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Min Salary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Max Salary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Job Posting"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
