import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TextInterviewModeProps {
  onSubmitAnswer: (text: string) => Promise<void>;
  timeLimit?: number;
  isProcessing: boolean;
}

export const TextInterviewMode = ({ onSubmitAnswer, timeLimit, isProcessing }: TextInterviewModeProps) => {
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }
    await onSubmitAnswer(answer);
    setAnswer('');
  };

  return (
    <div className="space-y-4">
      {timeLimit && (
        <div className="text-sm text-muted-foreground">
          Time remaining: {remainingTime}s
        </div>
      )}
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your response here..."
        className="min-h-[150px]"
      />
      <Button 
        onClick={handleSubmit}
        disabled={isProcessing || !answer.trim()}
      >
        {isProcessing ? "Processing..." : "Submit Answer"}
      </Button>
    </div>
  );
};