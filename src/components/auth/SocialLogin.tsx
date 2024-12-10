import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { account } from "@/integrations/appwrite/client";

interface SocialLoginProps {
  onSocialLogin: (provider: 'github' | 'linkedin' | 'google') => Promise<void>;
}

export const SocialLogin = ({ onSocialLogin }: SocialLoginProps) => {
  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={() => onSocialLogin('github')}
      >
        <Github className="h-5 w-5" />
        Continue with GitHub
      </Button>
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={() => onSocialLogin('linkedin')}
      >
        <Linkedin className="h-5 w-5" />
        Continue with LinkedIn
      </Button>
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={() => onSocialLogin('google')}
      >
        <Mail className="h-5 w-5" />
        Continue with Google
      </Button>
    </div>
  );
};