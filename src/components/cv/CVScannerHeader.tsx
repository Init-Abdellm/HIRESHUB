import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Brain, Loader2 } from "lucide-react";

interface CVScannerHeaderProps {
  isScanning: boolean;
  onScanCV: () => void;
}

export const CVScannerHeader: React.FC<CVScannerHeaderProps> = ({ 
  isScanning, 
  onScanCV 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">ATS Scanner</h3>
      </div>
      <Button 
        onClick={onScanCV} 
        disabled={isScanning}
        className="relative overflow-hidden"
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Scanning...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-4 w-4" />
            Scan CV
          </>
        )}
      </Button>
    </div>
  );
};