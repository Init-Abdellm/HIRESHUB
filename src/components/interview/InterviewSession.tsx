import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { databases, storage, DATABASE_ID, STORAGE_ID, COLLECTIONS, functions } from "@/integrations/appwrite/client";
import { TextInterviewMode } from './modes/TextInterviewMode';
import { VoiceInterviewMode } from './modes/VoiceInterviewMode';
import { VideoInterviewMode } from './modes/VideoInterviewMode';
import { InterviewFeedback } from './InterviewFeedback';
import { MessageSquare, Mic, Video } from "lucide-react";
import { ID } from 'appwrite';

interface InterviewSessionProps {
  interviewId: string;
  onSessionComplete: () => void;
}

export const InterviewSession = ({ interviewId, onSessionComplete }: InterviewSessionProps) => {
  const [sessionType, setSessionType] = useState<'text' | 'voice' | 'video'>('text');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const { toast } = useToast();

  const processResponse = async (content: string | Blob) => {
    setIsProcessing(true);
    try {
      let text = '';
      let mediaUrl = '';

      if (content instanceof Blob) {
        const file = new File(
          [content], 
          `interview-${Date.now()}.${sessionType === 'video' ? 'webm' : 'ogg'}`,
          { type: content.type }
        );

        const uploadResult = await storage.createFile(
          STORAGE_ID,
          ID.unique(),
          file
        );

        mediaUrl = storage.getFileView(
          STORAGE_ID,
          uploadResult.$id
        ).href;

        const execution = await functions.createExecution(
          'process-interview-media',
          JSON.stringify({ 
            type: sessionType,
            mediaUrl,
            interviewId 
          })
        );

        const analysis = JSON.parse(execution.responseBody);
        setFeedback(analysis);
        text = analysis.text;
      } else {
        text = content;
        const execution = await functions.createExecution(
          'ai-interview-handler',
          JSON.stringify({ text, interviewId })
        );
        const analysis = JSON.parse(execution.responseBody);
        setFeedback(analysis);
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.INTERVIEW_SESSIONS,
        ID.unique(),
        {
          interview_id: interviewId,
          session_type: sessionType,
          sentiment_scores: feedback?.sentiment,
          transcription: text,
          media_url: mediaUrl,
          model_type: 'openai',
          model_name: 'gpt-4o-mini',
        }
      );

      toast({
        title: "Success",
        description: "Response processed successfully.",
      });

      onSessionComplete();

    } catch (error) {
      console.error('Error processing response:', error);
      toast({
        title: "Error",
        description: "Failed to process response.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="text" onValueChange={(value) => setSessionType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text">
            <MessageSquare className="w-4 h-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="voice">
            <Mic className="w-4 h-4 mr-2" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="w-4 h-4 mr-2" />
            Video
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <TextInterviewMode
            onSubmitAnswer={processResponse}
            isProcessing={isProcessing}
          />
        </TabsContent>

        <TabsContent value="voice">
          <VoiceInterviewMode
            onSubmitRecording={processResponse}
            isProcessing={isProcessing}
          />
        </TabsContent>

        <TabsContent value="video">
          <VideoInterviewMode
            onSubmitRecording={processResponse}
            isProcessing={isProcessing}
          />
        </TabsContent>
      </Tabs>

      {feedback && (
        <div className="mt-6">
          <InterviewFeedback
            scores={feedback.scores}
            strengths={feedback.strengths}
            weaknesses={feedback.weaknesses}
            keywords={feedback.keywords}
          />
        </div>
      )}
    </Card>
  );
};
