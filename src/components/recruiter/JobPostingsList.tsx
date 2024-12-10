import { useQuery } from "@tanstack/react-query";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Query } from "appwrite";

interface JobPosting {
  $id: string;
  title: string;
  description: string | null;
  location: string | null;
  requirements: string[];
  salary_range: { min: number; max: number };
  $createdAt: string;
}

export const JobPostingsList = () => {
  const { toast } = useToast();

  const { data: jobPostings, isLoading } = useQuery({
    queryKey: ['jobPostings'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.JOB_POSTINGS,
        [
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents as JobPosting[];
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.JOB_POSTINGS,
        id
      );

      toast({
        title: "Success",
        description: "Job posting deleted successfully",
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
      {jobPostings?.map((posting) => (
        <Card key={posting.$id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{posting.title}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => handleDelete(posting.$id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-muted-foreground">{posting.description}</p>
              <div className="flex gap-2">
                <Badge>{posting.location}</Badge>
                <Badge variant="outline">
                  ${(posting.salary_range as { min: number; max: number }).min} - 
                  ${(posting.salary_range as { min: number; max: number }).max}
                </Badge>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="list-disc list-inside">
                  {posting.requirements?.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
