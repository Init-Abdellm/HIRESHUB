import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface FeedbackScore {
  label: string;
  score: number;
  color?: string;
}

interface InterviewFeedbackProps {
  scores: FeedbackScore[];
  strengths?: string[];
  weaknesses?: string[];
  keywords?: { word: string; used: boolean }[];
}

export const InterviewFeedback = ({ scores, strengths, weaknesses, keywords }: InterviewFeedbackProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Performance Analysis</h3>
        {scores.map((score, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{score.label}</span>
              <span>{score.score}%</span>
            </div>
            <Progress value={score.score} className="h-2" />
          </div>
        ))}
      </div>

      {(strengths?.length || weaknesses?.length) && (
        <div className="space-y-4">
          {strengths?.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Strengths</h4>
              <ul className="list-disc list-inside space-y-1">
                {strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-600">{strength}</li>
                ))}
              </ul>
            </div>
          )}

          {weaknesses?.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Areas for Improvement</h4>
              <ul className="list-disc list-inside space-y-1">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-red-600">{weakness}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {keywords?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Keywords Analysis</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs ${
                  keyword.used ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {keyword.word}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};