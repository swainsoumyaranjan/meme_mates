import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function AppsSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="apps" className="py-20 bg-neutral-100" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our <span className="text-primary">Apps</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Two innovative platforms designed to transform how we connect through memes
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* MemeSpace App Card */}
          <motion.div 
            className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6 lg:p-8"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={1}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <i className="fas fa-images text-primary text-3xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading mb-2 text-center sm:text-left">MemeSpace</h3>
                <p className="text-neutral-600">
                  A creative meme-sharing platform that goes beyond posting to foster genuine connections through shared humor
                </p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg mb-6 border border-neutral-200 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="MemeSpace app interface mockup" 
                className="w-full h-auto"
              />
              <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
                <i className="fas fa-star text-yellow-400"></i>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-share-alt text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Viral Trends</h4>
                  <p className="text-sm text-neutral-600">Create and participate in trending meme formats</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-palette text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Creative Tools</h4>
                  <p className="text-sm text-neutral-600">Easy-to-use meme generator with templates</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-trophy text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Challenges</h4>
                  <p className="text-sm text-neutral-600">Weekly meme contests with themed categories</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-shield-alt text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Safe Community</h4>
                  <p className="text-sm text-neutral-600">Content moderation to ensure positive experiences</p>
                </div>
              </div>
            </div>
            
            <a href="#contact">
              <Button className="bg-primary text-white hover:bg-primary/90 w-full">
                Join MemeSpace Beta
              </Button>
            </a>
          </motion.div>
          
          {/* MeetQ App Card */}
          <motion.div 
            className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6 lg:p-8"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={2}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <div className="bg-secondary/10 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <i className="fas fa-comments text-secondary text-3xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading mb-2 text-center sm:text-left">MeetQ</h3>
                <p className="text-neutral-600">
                  A social app that uses memes as conversation starters, helping people break the ice and build meaningful connections
                </p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg mb-6 border border-neutral-200 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="MeetQ app interface mockup" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-sm font-medium text-secondary flex items-center">
                <i className="fas fa-fire-alt mr-1"></i> Trending
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <div className="bg-secondary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-user-friends text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Meme Matchmaking</h4>
                  <p className="text-sm text-neutral-600">Connect with people who share your humor</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-gamepad text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Interactive Games</h4>
                  <p className="text-sm text-neutral-600">Meme-based games to break the ice</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-music text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Media Integration</h4>
                  <p className="text-sm text-neutral-600">Mix memes with music and videos for richer expression</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/10 p-2 rounded-lg mr-3">
                  <i className="fas fa-calendar-alt text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Events & Meetups</h4>
                  <p className="text-sm text-neutral-600">Virtual and local gatherings for meme enthusiasts</p>
                </div>
              </div>
            </div>
            
            <a href="#contact">
              <Button className="bg-secondary text-white hover:bg-secondary/90 w-full">
                Get MeetQ Early Access
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
