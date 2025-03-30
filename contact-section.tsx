import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [memeSpace, setMemeSpace] = useState(false);
  const [meetQ, setMeetQ] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!memeSpace && !meetQ) {
      toast({
        title: "Error",
        description: "Please select at least one app you're interested in",
        variant: "destructive",
      });
      return;
    }
    
    // Form would be submitted to backend here
    toast({
      title: "Success!",
      description: "You've been added to our waitlist. We'll be in touch soon!",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setMemeSpace(false);
    setMeetQ(false);
  };
  
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
    <section id="contact" className="py-20 bg-neutral-100" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Join the <span className="text-primary">Movement</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Be among the first to experience the future of meme-based social networking
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={1}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold font-heading mb-4">Get Early Access</h3>
                <p className="text-neutral-600 mb-6">
                  Join our waitlist to be notified when we launch and get exclusive early access to both MemeSpace and MeetQ.
                </p>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full" 
                      placeholder="Your name" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-neutral-700 mb-1">Interested In</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="memespace" 
                          checked={memeSpace}
                          onCheckedChange={(checked) => setMemeSpace(checked as boolean)}
                        />
                        <Label htmlFor="memespace" className="text-sm text-neutral-600">MemeSpace</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="meetq" 
                          checked={meetQ}
                          onCheckedChange={(checked) => setMeetQ(checked as boolean)}
                        />
                        <Label htmlFor="meetq" className="text-sm text-neutral-600">MeetQ</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">How do you use memes in your social interactions?</Label>
                    <Textarea 
                      id="message" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3} 
                      className="w-full" 
                      placeholder="Tell us a bit about how you use memes..."
                    />
                  </div>
                  
                  <Button type="submit" className="bg-primary text-white hover:bg-primary/90 w-full">
                    Join the Waitlist
                  </Button>
                </form>
                
                <div className="mt-6 text-sm text-neutral-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary to-secondary text-white p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-heading mb-6">Why Join Early?</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <i className="fas fa-crown text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Exclusive Features</h4>
                        <p className="text-white/80 text-sm">
                          Early adopters get access to premium features free for the first year
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <i className="fas fa-medal text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Founding Member Status</h4>
                        <p className="text-white/80 text-sm">
                          A special badge and recognition in the community
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <i className="fas fa-comment-dots text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Shape the Product</h4>
                        <p className="text-white/80 text-sm">
                          Provide direct feedback to our development team
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <i className="fas fa-gift text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Exclusive Merch</h4>
                        <p className="text-white/80 text-sm">
                          First 500 members get limited edition MemeMates merchandise
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <a href="#" className="text-white hover:text-white/80">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80">
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80">
                      <i className="fab fa-tiktok text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80">
                      <i className="fab fa-discord text-xl"></i>
                    </a>
                  </div>
                  <p className="text-white/80 text-sm">
                    Questions? Email us at <a href="mailto:hello@mememates.com" className="underline">hello@mememates.com</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
