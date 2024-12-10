import { useEffect, useState } from "react";
import { account, databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Profile } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { motion, AnimatePresence } from "framer-motion";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { EnterpriseSection } from "@/components/home/EnterpriseSection";

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await account.get();
        if (session) {
          const profileData = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.PROFILES,
            session.$id
          );

          if (profileData) setProfile(profileData as unknown as Profile);
        }
      } catch (error: any) {
        console.error('Error:', error);
        // Don't show error toast for unauthenticated users
        if (error.code !== 401) {
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <HeroSection profile={profile} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <StatisticsSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <FeaturesSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <EnterpriseSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <TestimonialsSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <PricingSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <CTASection profile={profile} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;