import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Profile } from "@/types/database";

interface CTASectionProps {
  profile: Profile | null;
}

export const CTASection = ({ profile }: CTASectionProps) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
          <span className="block">
            {profile?.role === 'recruiter' ?
              "Ready to transform your hiring process?" :
              "Ready to advance your career?"
            }
          </span>
          <span className="block text-secondary">Start your journey today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link to={profile?.role === 'recruiter' ? "/dashboard" : "/cv-builder"}>
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};