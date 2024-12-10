import { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Query } from "appwrite";
import { useQuery } from "@tanstack/react-query";

export const CVLibrary = () => {
  const navigate = useNavigate();

  const { data: cvs, isLoading } = useQuery({
    queryKey: ['cvs'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CVS,
        [
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your CVs</h2>
        <Button onClick={() => navigate('/cv-builder')}>
          Create New CV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cvs?.map((cv) => (
          <Card key={cv.$id} className="p-4">
            <h3 className="font-semibold mb-2">{cv.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Last updated: {format(new Date(cv.$updatedAt), 'PP')}
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/cv-builder/${cv.$id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/interviews/new?cv=${cv.$id}`)}
              >
                Start Interview
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};