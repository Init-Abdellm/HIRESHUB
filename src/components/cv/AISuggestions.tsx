import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Lightbulb, Sparkles } from "lucide-react";
import { functions } from "@/integrations/appwrite/client";
import { motion, AnimatePresence } from "framer-motion";

interface AISuggestionsProps {
  cvId: string;
  fieldName: string;
  content: string;
}

export const AISuggestions = ({ cvId, fieldName, content }: AISuggestionsProps) => {
  const { data: suggestions, isLoading, refetch } = useQuery({
    queryKey: ['cv-suggestions', cvId, fieldName],
    queryFn: async () => {
      const execution = await functions.createExecution(
        'generate-cv-suggestions',
        JSON.stringify({ cvId, fieldName, content })
      );
      return JSON.parse(execution.responseBody).suggestions;
    },
    enabled: false
  });

  return (
    <Card className="p-4 mt-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="font-medium">AI Suggestions</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
          className="relative"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Get Suggestions
            </>
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {suggestions && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2 text-sm"
          >
            {suggestions.map((suggestion: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">{suggestion}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Card>
  );
};