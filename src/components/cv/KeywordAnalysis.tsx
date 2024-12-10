import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface KeywordAnalysisProps {
  keywords: {
    word: string;
    frequency: number;
    relevance: number;
    category: 'technical' | 'soft' | 'industry';
  }[];
}

export const KeywordAnalysis = ({ keywords }: KeywordAnalysisProps) => {
  const getColorByCategory = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-500';
      case 'soft':
        return 'bg-green-500';
      case 'industry':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Keyword Analysis</h3>
        <div className="flex gap-2">
          <Badge variant="outline">Technical</Badge>
          <Badge variant="outline">Soft Skills</Badge>
          <Badge variant="outline">Industry</Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        {keywords.map((keyword, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">{keyword.word}</span>
              <Badge variant="secondary">
                {keyword.frequency}x
              </Badge>
            </div>
            <Progress 
              value={keyword.relevance * 100} 
              className={`h-2 ${getColorByCategory(keyword.category)}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};