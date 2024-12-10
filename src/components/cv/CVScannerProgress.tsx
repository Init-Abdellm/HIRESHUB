import React from 'react';
import { Progress } from "@/components/ui/progress";

interface CVScannerProgressProps {
  scanProgress: number;
}

export const CVScannerProgress: React.FC<CVScannerProgressProps> = ({ 
  scanProgress 
}) => {
  return (
    <div className="space-y-2">
      <Progress value={scanProgress} className="w-full" />
      <p className="text-sm text-muted-foreground text-center">
        Analyzing your CV... {scanProgress}%
      </p>
    </div>
  );
};