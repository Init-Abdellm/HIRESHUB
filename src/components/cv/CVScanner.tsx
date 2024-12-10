import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { CVScannerHeader } from "./CVScannerHeader";
import { CVScannerProgress } from "./CVScannerProgress";
import { CVScannerResults } from "./CVScannerResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeywordAnalysis } from "./KeywordAnalysis";  // Added import
import { DetailedRecommendations } from "./DetailedRecommendations";  // Added import

interface CVScannerProps {
  cvId: string;
}

export const CVScanner = ({ cvId }: CVScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isPreparingInterview, setIsPreparingInterview] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();

  const scanCV = async () => {
    try {
      setIsScanning(true);
      setScanProgress(0);
      
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 10, 90));
      }, 500);
      
      const { data, error } = await supabase.functions.invoke('scan-cv', {
        body: { cvId }
      });

      clearInterval(progressInterval);
      setScanProgress(100);

      if (error) throw error;

      setScanResult(data);
      toast({
        title: "CV Scan Complete",
        description: "Your CV has been analyzed for ATS optimization.",
      });
    } catch (error) {
      console.error('Error scanning CV:', error);
      toast({
        title: "Error",
        description: "Failed to scan CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const prepareInterview = async () => {
    try {
      setIsPreparingInterview(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: interview, error: createError } = await supabase
        .from('interviews')
        .insert({
          user_id: user.id,
          cv_id: cvId,
          scheduled_at: new Date().toISOString(),
          preparation_complete: true,
          preparation_notes: scanResult
        })
        .select()
        .single();

      if (createError) throw createError;

      toast({
        title: "Interview Prepared",
        description: "Your interview has been prepared based on your CV analysis.",
      });

      window.location.href = '/interviews';
    } catch (error) {
      console.error('Error preparing interview:', error);
      toast({
        title: "Error",
        description: "Failed to prepare interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPreparingInterview(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 space-y-4">
        <CVScannerHeader 
          isScanning={isScanning} 
          onScanCV={scanCV} 
        />

        {isScanning && (
          <CVScannerProgress scanProgress={scanProgress} />
        )}

        <AnimatePresence>
          {scanResult && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <CVScannerResults 
                  scanResult={scanResult}
                  isPreparingInterview={isPreparingInterview}
                  onPrepareInterview={prepareInterview}
                />
              </TabsContent>
              <TabsContent value="keywords">
                <KeywordAnalysis keywords={scanResult.keywords} />
              </TabsContent>
              <TabsContent value="recommendations">
                <DetailedRecommendations recommendations={scanResult.recommendations} />
              </TabsContent>
            </Tabs>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};