import { motion } from "framer-motion";
import { Users2, FileText, Building2, Award } from "lucide-react";

const stats = [
  {
    title: "Active Users",
    value: "50K+",
    icon: <Users2 className="w-6 h-6 text-primary" />,
    description: "Professionals using our platform"
  },
  {
    title: "CVs Created",
    value: "100K+",
    icon: <FileText className="w-6 h-6 text-primary" />,
    description: "Professional CVs generated"
  },
  {
    title: "Companies",
    value: "1000+",
    icon: <Building2 className="w-6 h-6 text-primary" />,
    description: "Partner companies hiring"
  },
  {
    title: "Success Rate",
    value: "89%",
    icon: <Award className="w-6 h-6 text-primary" />,
    description: "Interview success rate"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const StatisticsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-2 text-foreground">{stat.value}</h3>
              <p className="text-lg font-semibold text-center mb-1 text-foreground">{stat.title}</p>
              <p className="text-sm text-muted-foreground text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};