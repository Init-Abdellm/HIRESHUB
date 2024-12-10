import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, LineChart, Users } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and data protection for your organization"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Advanced AI Integration",
    description: "Custom AI models trained on your industry requirements"
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Comprehensive insights and hiring metrics"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description: "Multi-user access and role-based permissions"
  }
];

export const EnterpriseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Enterprise Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and features designed for large organizations and recruitment teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
};