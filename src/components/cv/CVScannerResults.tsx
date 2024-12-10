import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface CVScannerResultsProps {
  scanResult: any;
  isPreparingInterview: boolean;
  onPrepareInterview: () => void;
}

export const CVScannerResults: React.FC<CVScannerResultsProps> = ({ 
  scanResult, 
  isPreparingInterview, 
  onPrepareInterview 
}) => {
  if (!scanResult) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4"
    >
      <Alert variant={scanResult.score >= 70 ? "default" : "destructive"}>
        <div className="flex items-center gap-2">
          {scanResult.score >= 70 ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>ATS Score: {scanResult.score}%</AlertTitle>
        </div>
        <AlertDescription>
          {scanResult.score >= 70 
            ? "Your CV is well-optimized for ATS systems!"
            : "Your CV needs improvement for better ATS compatibility."}
        </AlertDescription>
      </Alert>

      {scanResult.suggestions && scanResult.suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium mb-2">Suggestions for Improvement:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {scanResult.suggestions.map((suggestion: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-muted-foreground"
              >
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      <Button 
        onClick={onPrepareInterview} 
        disabled={isPreparingInterview}
        className="w-full"
      >
        {isPreparingInterview ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing Interview...
          </>
        ) : (
          "Prepare AI Interview"
        )}
      </Button>
    </motion.div>
  );
};