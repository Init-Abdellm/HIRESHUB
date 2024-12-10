import { Card } from "@/components/ui/card";
import {
  LayoutTemplate,
  Wand2,
  FileText,
  Search,
  Download,
  LinkedinIcon,
  Paintbrush,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Professional Templates",
    description: "Choose from a variety of professionally designed templates to make your CV stand out.",
    icon: <LayoutTemplate className="w-10 h-10 text-primary" />,
  },
  {
    title: "AI-Powered Content",
    description: "Generate professional content suggestions with our AI assistant to highlight your experience.",
    icon: <Wand2 className="w-10 h-10 text-primary" />,
  },
  {
    title: "ATS Optimization",
    description: "Ensure your CV passes Applicant Tracking Systems with our built-in optimization tools.",
    icon: <Search className="w-10 h-10 text-primary" />,
  },
  {
    title: "Easy Export",
    description: "Download your CV in multiple formats including PDF and Word.",
    icon: <Download className="w-10 h-10 text-primary" />,
  },
  {
    title: "Import from LinkedIn",
    description: "Quickly import your professional experience from LinkedIn to save time.",
    icon: <LinkedinIcon className="w-10 h-10 text-primary" />,
  },
  {
    title: "Customizable Design",
    description: "Personalize colors, fonts, and layouts to match your personal brand.",
    icon: <Paintbrush className="w-10 h-10 text-primary" />,
  },
  {
    title: "Section Management",
    description: "Easily reorganize and customize CV sections to highlight your strengths.",
    icon: <FileText className="w-10 h-10 text-primary" />,
  },
  {
    title: "Style Preferences",
    description: "Fine-tune spacing, typography, and visual elements to create the perfect look.",
    icon: <SlidersHorizontal className="w-10 h-10 text-primary" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Powerful CV Builder Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create a professional, ATS-optimized CV
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 p-3 rounded-full bg-primary/10">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};