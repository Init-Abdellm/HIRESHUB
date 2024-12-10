import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mic, StopCircle } from "lucide-react";

interface VoiceInterviewModeProps {
  onSubmitRecording: (blob: Blob) => Promise<void>;
  timeLimit?: number;
  isProcessing: boolean;
}

export const VoiceInterviewMode = ({ onSubmitRecording, timeLimit, isProcessing }: VoiceInterviewModeProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await onSubmitRecording(blob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      if (timeLimit) {
        setTimeout(() => stopRecording(), timeLimit * 1000);
      }

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Failed to start recording. Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {!isRecording ? (
          <Button 
            onClick={startRecording} 
            disabled={isProcessing}
            className="w-32 h-32 rounded-full"
          >
            <Mic className="w-8 h-8" />
          </Button>
        ) : (
          <Button 
            onClick={stopRecording} 
            variant="destructive"
            className="w-32 h-32 rounded-full animate-pulse"
          >
            <StopCircle className="w-8 h-8" />
          </Button>
        )}
      </div>
      {isRecording && (
        <p className="text-center text-sm text-muted-foreground">
          Recording in progress...
        </p>
      )}
    </div>
  );
};