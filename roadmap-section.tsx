import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function RoadmapSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
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
    <section id="roadmap" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Development <span className="text-primary">Roadmap</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our journey from concept to launch and beyond
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-neutral-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-12 relative">
            {/* Phase 1 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              animate={controls}
              variants={fadeInVariants}
              custom={1}
            >
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <div className="bg-primary/5 inline-block px-3 py-1 rounded-full text-primary text-sm font-medium mb-2">
                  Phase 1 - Completed
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Ideation & Concept Validation</h3>
                <p className="text-neutral-600">
                  Developed initial concepts for MemeSpace and MeetQ, conducted market research, and validated core assumptions with target users.
                </p>
              </div>
              
              <div className="md:w-12 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg z-10">
                  <i className="fas fa-lightbulb"></i>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </motion.div>
            
            {/* Phase 2 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              animate={controls}
              variants={fadeInVariants}
              custom={2}
            >
              <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
              
              <div className="md:w-12 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg z-10">
                  <i className="fas fa-paint-brush"></i>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 md:text-left">
                <div className="bg-primary/5 inline-block px-3 py-1 rounded-full text-primary text-sm font-medium mb-2">
                  Phase 2 - Current
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Design & Prototyping</h3>
                <p className="text-neutral-600">
                  Developing comprehensive visual identity, creating wireframes and interactive prototypes for core functionalities, and refining UX based on initial feedback.
                </p>
              </div>
            </motion.div>
            
            {/* Phase 3 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              animate={controls}
              variants={fadeInVariants}
              custom={3}
            >
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <div className="bg-neutral-200 inline-block px-3 py-1 rounded-full text-neutral-600 text-sm font-medium mb-2">
                  Phase 3 - Q2 2023
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Core Development</h3>
                <p className="text-neutral-600">
                  Building the technology stack with Flutter for mobile and React for web components, implementing core features like meme creation, sharing, and basic social interactions.
                </p>
              </div>
              
              <div className="md:w-12 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-neutral-300 flex items-center justify-center text-white shadow-lg z-10">
                  <i className="fas fa-code"></i>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </motion.div>
            
            {/* Phase 4 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              animate={controls}
              variants={fadeInVariants}
              custom={4}
            >
              <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
              
              <div className="md:w-12 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-neutral-300 flex items-center justify-center text-white shadow-lg z-10">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 md:text-left">
                <div className="bg-neutral-200 inline-block px-3 py-1 rounded-full text-neutral-600 text-sm font-medium mb-2">
                  Phase 4 - Q3 2023
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Beta Testing & Refinement</h3>
                <p className="text-neutral-600">
                  Launching closed beta with select users, gathering detailed feedback, implementing improvements, and optimizing performance across platforms.
                </p>
              </div>
            </motion.div>
            
            {/* Phase 5 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              animate={controls}
              variants={fadeInVariants}
              custom={5}
            >
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <div className="bg-neutral-200 inline-block px-3 py-1 rounded-full text-neutral-600 text-sm font-medium mb-2">
                  Phase 5 - Q4 2023
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Public Launch & Growth</h3>
                <p className="text-neutral-600">
                  Public release of both apps, implementation of marketing strategies, continuous feature development, and community growth initiatives.
                </p>
              </div>
              
              <div className="md:w-12 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-neutral-300 flex items-center justify-center text-white shadow-lg z-10">
                  <i className="fas fa-rocket"></i>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={6}
        >
          <Card className="p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold font-heading mb-4 flex items-center">
              <i className="fas fa-cogs text-primary mr-3"></i>
              Technology Stack
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3">Frontend</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 text-center text-blue-500 mr-3">
                      <i className="fab fa-react text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">React</p>
                      <p className="text-sm text-neutral-600">For web components</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 text-center text-blue-400 mr-3">
                      <i className="fab fa-flutter text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">Flutter</p>
                      <p className="text-sm text-neutral-600">Cross-platform mobile apps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 text-center text-purple-500 mr-3">
                      <i className="fab fa-sass text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">SASS/SCSS</p>
                      <p className="text-sm text-neutral-600">Advanced styling</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3">Backend</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 text-center text-green-500 mr-3">
                      <i className="fab fa-node-js text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">Node.js & Express</p>
                      <p className="text-sm text-neutral-600">API handling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 text-center text-yellow-500 mr-3">
                      <i className="fas fa-database text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">Firebase</p>
                      <p className="text-sm text-neutral-600">Real-time database</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 text-center text-blue-600 mr-3">
                      <i className="fas fa-server text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium">PostgreSQL</p>
                      <p className="text-sm text-neutral-600">Relational database</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
