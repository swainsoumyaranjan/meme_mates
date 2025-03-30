import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ImpactSection() {
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
    <section id="impact" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Potential <span className="text-primary">Impact</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            How meme-based social networking can transform digital connections
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={1}
          >
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <i className="fas fa-language text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Universal Language</h3>
            <p className="text-neutral-600 mb-4">
              Memes transcend language barriers, creating a global platform for connection regardless of linguistic differences.
            </p>
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex items-center text-neutral-700">
                <i className="fas fa-globe-americas mr-2"></i>
                <span className="text-sm">200+ countries connected through memes</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={2}
          >
            <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <i className="fas fa-heart text-secondary text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Emotional Connection</h3>
            <p className="text-neutral-600 mb-4">
              Sharing humor creates stronger emotional bonds than traditional text-based communication, leading to more meaningful relationships.
            </p>
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex items-center text-neutral-700">
                <i className="fas fa-smile mr-2"></i>
                <span className="text-sm">87% reported stronger connections through shared humor</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={3}
          >
            <div className="bg-blue-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <i className="fas fa-brain text-blue-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Mental Health Benefits</h3>
            <p className="text-neutral-600 mb-4">
              Humor and community support can provide significant mental health benefits, reducing feelings of isolation in digital spaces.
            </p>
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex items-center text-neutral-700">
                <i className="fas fa-chart-line mr-2"></i>
                <span className="text-sm">65% reduction in reported feelings of isolation</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 md:p-10"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={4}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
              <h3 className="text-2xl font-bold font-heading mb-4">Beyond Entertainment</h3>
              <p className="text-neutral-700 mb-4">
                Memes are no longer just for entertainment. They've evolved into powerful tools for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Building communities around shared interests and values</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Breaking the ice in new social interactions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Expressing complex emotions in accessible formats</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Creating cultural touchpoints that define generations</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3">
              <Card className="bg-white p-5 rotate-3 transform transition-transform hover:rotate-0">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                    alt="People laughing together at memes" 
                    className="rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Real Connection
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
