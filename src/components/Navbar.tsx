import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { UserMenu } from "./user/UserMenu";
import { NotificationBell } from "./user/NotificationBell";
import { useQuery } from "@tanstack/react-query";
import { account } from "@/integrations/appwrite/client";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const session = await account.get();
        return session;
      } catch (error) {
        return null;
      }
    },
  });

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">HiresHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cv-builder">
              <Button variant="ghost">CV Builder</Button>
            </Link>
            <Link to="/interviews">
              <Button variant="ghost">Interviews</Button>
            </Link>
            {session ? (
              <>
                <NotificationBell />
                <UserMenu />
              </>
            ) : (
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {session && <NotificationBell />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/cv-builder" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  CV Builder
                </Button>
              </Link>
              <Link to="/interviews" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Interviews
                </Button>
              </Link>
              {session ? (
                <>
                  <Link to="/profile" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      Profile
                    </Button>
                  </Link>
                  <Link to="/settings" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      Settings
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={async () => {
                      await account.deleteSession('current');
                      window.location.href = "/login";
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/login" className="block">
                  <Button className="w-full justify-start">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
