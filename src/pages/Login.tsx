import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { account } from "@/integrations/appwrite/client";
import { ID } from "appwrite";
import { EmailForm } from "@/components/auth/EmailForm";
import { SocialLogin } from "@/components/auth/SocialLogin";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await account.get();
        if (session) {
          navigate('/');
        }
      } catch (error) {
        console.log('No active session');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  const handleEmailAuth = async (email: string, password: string, username?: string) => {
    try {
      if (isSignUp) {
        await account.create(
          ID.unique(),
          email,
          password,
          username
        );
        
        toast({
          title: "Account created",
          description: "You can now sign in with your credentials.",
        });
        
        setIsSignUp(false);
      } else {
        await account.createEmailSession(email, password);
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: isSignUp ? "Registration Failed" : "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'linkedin' | 'google') => {
    try {
      let authProvider = '';
      switch (provider) {
        case 'github':
          authProvider = 'github';
          break;
        case 'linkedin':
          authProvider = 'linkedin';
          break;
        case 'google':
          authProvider = 'google';
          break;
      }
      
      account.createOAuth2Session(
        authProvider,
        `${window.location.origin}/`,
        `${window.location.origin}/login`
      );
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return null;
  }

  if (showRoleSelector) {
    return <RoleSelector />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-primary-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to HiresHub</CardTitle>
          <CardDescription>Sign in to access your professional journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <EmailForm 
                isSignUp={isSignUp}
                onSubmit={handleEmailAuth}
                onToggleMode={() => setIsSignUp(!isSignUp)}
              />
            </TabsContent>
            <TabsContent value="social">
              <SocialLogin onSocialLogin={handleSocialLogin} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;