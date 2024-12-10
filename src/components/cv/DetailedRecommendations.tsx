import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface DetailedRecommendationsProps {
  recommendations: {
    category: string;
    items: {
      type: 'success' | 'warning' | 'improvement';
      message: string;
      action?: string;
    }[];
  }[];
}

export const DetailedRecommendations = ({ recommendations }: DetailedRecommendationsProps) => {
  return (
    <Card className="p-4 space-y-6">
      {recommendations.map((category, categoryIndex) => (
        <motion.div
          key={categoryIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-3">{category.category}</h3>
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
              >
                {item.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                ) : item.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="text-sm">{item.message}</p>
                  {item.action && (
                    <p className="text-sm text-muted-foreground">
                      Suggestion: {item.action}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </Card>
  );
};