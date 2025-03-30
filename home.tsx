import { useEffect } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/sections/hero-section";
import IntroSection from "@/components/sections/intro-section";
import AppsSection from "@/components/sections/apps-section";
import ImpactSection from "@/components/sections/impact-section";
import ResearchSection from "@/components/sections/research-section";
import MoodBoardSection from "@/components/sections/mood-board-section";
import RoadmapSection from "@/components/sections/roadmap-section";
import ContactSection from "@/components/sections/contact-section";
import TelegramContactSection from "@/components/sections/telegram-contact-section";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function HomeNavbar() {
  const [, setLocation] = useLocation();
  
  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-primary">
              <span className="text-2xl font-bold font-heading">
                Meme<span className="text-secondary">Mates</span>
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#intro" className="text-neutral-600 hover:text-primary font-medium transition-colors">Intro</a>
            <a href="#apps" className="text-neutral-600 hover:text-primary font-medium transition-colors">Our Apps</a>
            <a href="#impact" className="text-neutral-600 hover:text-primary font-medium transition-colors">Impact</a>
            <a href="#mood-board" className="text-neutral-600 hover:text-primary font-medium transition-colors">Design</a>
            <a href="#research" className="text-neutral-600 hover:text-primary font-medium transition-colors">Research</a>
            <a href="#roadmap" className="text-neutral-600 hover:text-primary font-medium transition-colors">Roadmap</a>
            <a href="#telegram-contact" className="text-neutral-600 hover:text-primary font-medium transition-colors">Telegram</a>
            <Button 
              variant="outline" 
              className="ml-4"
              onClick={() => setLocation("/login")}
            >
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  
  // Check if user is authenticated (in a real app, we would use a more robust check)
  // For our demo purposes, we're just checking if they came from login page
  // In a real app, this would check for valid session/token
  useEffect(() => {
    const isAuthenticated = true; // Simplified for demo - would be a real check in production
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [setLocation]);
  
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HomeNavbar />
      <HeroSection />
      <IntroSection />
      <AppsSection />
      <ImpactSection />
      <MoodBoardSection />
      <ResearchSection />
      <RoadmapSection />
      <ContactSection />
      <TelegramContactSection />
      <Footer />
    </motion.div>
  );
}
