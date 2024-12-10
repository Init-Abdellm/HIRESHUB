import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Profile } from "@/types/database";
import { motion } from "framer-motion";

interface HeroSectionProps {
  profile: Profile | null;
}

export const HeroSection = ({ profile }: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <motion.main 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
          >
            <motion.div variants={itemVariants} className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-primary-900 sm:text-5xl md:text-6xl">
                {profile?.role === 'recruiter' ? (
                  <>
                    <motion.span variants={itemVariants} className="block xl:inline">Transform your</motion.span>{" "}
                    <motion.span variants={itemVariants} className="block text-secondary xl:inline">hiring process</motion.span>
                  </>
                ) : (
                  <>
                    <motion.span variants={itemVariants} className="block xl:inline">Transform your</motion.span>{" "}
                    <motion.span variants={itemVariants} className="block text-secondary xl:inline">career journey</motion.span>
                  </>
                )}
              </h1>
              <motion.p 
                variants={itemVariants}
                className="mt-3 text-base text-primary-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                {profile?.role === 'recruiter' ? (
                  "Streamline your recruitment process with AI-powered interviews. Send bulk invitations, track candidate progress, and receive detailed reports."
                ) : (
                  "Leverage AI-powered tools to create ATS-optimized CVs, practice with intelligent interviews, and receive personalized feedback to excel in your job search."
                )}
              </motion.p>
              <motion.div 
                variants={itemVariants}
                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4"
              >
                {profile?.role === 'recruiter' ? (
                  <>
                    <Link to="/dashboard">
                      <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-base hover:scale-105 transition-transform">
                        Recruiter Dashboard
                      </Button>
                    </Link>
                    <Link to="/bulk-invite">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-3 text-base mt-3 sm:mt-0 hover:scale-105 transition-transform">
                        Send Invitations
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/cv-builder">
                      <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-base hover:scale-105 transition-transform">
                        Build Your CV
                      </Button>
                    </Link>
                    <Link to="/interviews">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-3 text-base mt-3 sm:mt-0 hover:scale-105 transition-transform">
                        Practice Interviews
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.main>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
      >
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-lg shadow-xl"
          src={profile?.role === 'recruiter' ? 
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" :
            "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80"
          }
          alt={profile?.role === 'recruiter' ? 
            "Modern office with people working" :
            "Modern office building representing professional growth"
          }
        />
      </motion.div>
    </div>
  );
};