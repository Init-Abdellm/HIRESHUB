import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CVPreviewProps {
  cv: any;
}

const templates = {
  modern: {
    containerClass: "p-8 bg-white",
    headerClass: "border-b-2 border-primary pb-4 mb-6",
    sectionClass: "mb-6",
    titleClass: "text-2xl font-bold text-primary mb-2",
    subtitleClass: "text-lg font-semibold text-gray-700 mb-2",
  },
  professional: {
    containerClass: "p-8 bg-gray-50",
    headerClass: "bg-primary text-white p-6 mb-6 rounded-t",
    sectionClass: "mb-8 bg-white p-6 rounded shadow",
    titleClass: "text-2xl font-bold mb-4",
    subtitleClass: "text-xl font-semibold text-primary mb-3",
  },
  creative: {
    containerClass: "p-8 bg-gradient-to-br from-primary-50 to-white",
    headerClass: "text-center mb-8",
    sectionClass: "mb-8 backdrop-blur-sm bg-white/80 p-6 rounded-lg",
    titleClass: "text-3xl font-bold text-primary mb-3",
    subtitleClass: "text-xl font-medium text-primary-700 mb-3",
  },
};

export const CVPreview = ({ cv }: CVPreviewProps) => {
  if (!cv) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          CV preview will appear here
        </div>
      </Card>
    );
  }

  const { content, template = "modern" } = cv;
  const style = templates[template as keyof typeof templates];

  const renderSection = (title: string, content: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={style.sectionClass}
    >
      <h3 className={style.subtitleClass}>{title}</h3>
      <div className="whitespace-pre-wrap">{content}</div>
    </motion.div>
  );

  return (
    <Card className={style.containerClass}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={style.headerClass}>
          <h2 className={style.titleClass}>{content.fullName}</h2>
          <div className="text-lg opacity-90">
            {content.email} • {content.phone}
          </div>
        </div>

        {content.summary && renderSection("Professional Summary", content.summary)}
        {content.experience && renderSection("Experience", content.experience)}
        {content.education && renderSection("Education", content.education)}
        {content.skills && renderSection("Skills", content.skills)}
      </motion.div>
    </Card>
  );
};