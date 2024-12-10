import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import CVBuilder from "./pages/CVBuilder";
import Interviews from "./pages/Interviews";
import Login from "./pages/Login";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import UserDashboard from "./pages/UserDashboard";
import { initializeCollections } from "@/integrations/appwrite/client";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeCollections();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cv-builder" element={<CVBuilder />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
                <Route path="/dashboard" element={<UserDashboard />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;