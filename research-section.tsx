import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ResearchSection() {
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
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="research" className="py-20 bg-neutral-100" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">User <span className="text-primary">Research</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Validating our concepts with real users to ensure we're building products people love
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={1}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold font-heading mb-4">What Users Are Saying</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-primary">JK</span>
                    </div>
                    <div>
                      <p className="font-bold">Jamie K.</p>
                      <p className="text-sm text-neutral-500">MemeSpace Beta Tester</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    "I've found people who actually get my humor for the first time! The meme challenges are addictive and I've made some genuine friends through them."
                  </p>
                </div>
                
                <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-secondary">TR</span>
                    </div>
                    <div>
                      <p className="font-bold">Taylor R.</p>
                      <p className="text-sm text-neutral-500">MeetQ Early Adopter</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    "Starting conversations has always been tough for me, but MeetQ makes it so natural. Sharing memes is way less awkward than trying to think of the perfect opening line."
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-neutral-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-primary mb-2">94%</div>
                  <p className="text-sm text-neutral-600">Found meme-based conversations easier to start</p>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">78%</div>
                  <p className="text-sm text-neutral-600">Reported making new online friends through shared memes</p>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
                  <p className="text-sm text-neutral-600">Would choose a meme-based platform over traditional social media</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
                <h4 className="font-bold mb-2">Next Steps Based on Feedback</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-sm">Enhance content creation tools based on user requests</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-sm">Add more theme-based challenges and events</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-sm">Implement enhanced privacy controls</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-sm">Expand meme template library with trending formats</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={2}
          >
            <Card className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold font-heading mb-4">Research Methodology</h3>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-1">
                    <i className="fas fa-poll text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Surveys</h4>
                    <p className="text-sm text-neutral-600">
                      1,200+ responses from diverse demographics to validate core concepts
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary/10 p-2 rounded-lg mr-3 mt-1">
                    <i className="fas fa-user-friends text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Focus Groups</h4>
                    <p className="text-sm text-neutral-600">
                      12 focus groups across different age ranges and social media usage patterns
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-400/10 p-2 rounded-lg mr-3 mt-1">
                    <i className="fas fa-laptop-code text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Beta Testing</h4>
                    <p className="text-sm text-neutral-600">
                      350 active beta testers providing ongoing feedback and usage data
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-neutral-200 p-2 rounded-lg mr-3 mt-1">
                    <i className="fas fa-chart-bar text-neutral-700"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Data Analysis</h4>
                    <p className="text-sm text-neutral-600">
                      Comprehensive analysis of engagement patterns and user satisfaction metrics
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center">
                  <span>View Full Research Report</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
