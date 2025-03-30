import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
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
    <section id="intro" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Introducing <span className="text-primary">MemeMates</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Where memes aren't just for laughs—they're the foundation for meaningful connections
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={1}
          >
            <h3 className="text-2xl font-bold font-heading mb-4">Our Story</h3>
            <p className="text-neutral-600 mb-6">
              MemeMates was born from a simple observation: memes have become the universal language of the internet, transcending cultural and linguistic barriers to connect people worldwide.
            </p>
            <p className="text-neutral-600 mb-6">
              We recognized that behind every shared meme is an opportunity for connection—a chance to find like-minded individuals who share your sense of humor and worldview.
            </p>
            <div className="flex items-center space-x-3 text-primary">
              <i className="fas fa-lightbulb text-xl"></i>
              <p className="font-medium">Leveraging memes as the foundation for meaningful social connections</p>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={2}
          >
            <div className="flex items-start mb-4">
              <div className="bg-primary/10 p-3 rounded-lg mr-4">
                <i className="fas fa-quote-left text-primary text-xl"></i>
              </div>
              <div>
                <h4 className="text-xl font-bold font-heading mb-2">Why Memes Matter</h4>
                <p className="text-neutral-600">
                  In today's digital landscape, memes have evolved from simple jokes to powerful cultural artifacts that shape conversations and build communities.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-neutral-100 p-4 rounded-lg">
                <h5 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-globe text-secondary mr-2"></i>
                  Universal Language
                </h5>
                <p className="text-sm text-neutral-600">
                  Memes transcend linguistic barriers, connecting people across cultures
                </p>
              </div>
              
              <div className="bg-neutral-100 p-4 rounded-lg">
                <h5 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-brain text-secondary mr-2"></i>
                  Emotional Resonance
                </h5>
                <p className="text-sm text-neutral-600">
                  They convey complex emotions and shared experiences in bite-sized formats
                </p>
              </div>
              
              <div className="bg-neutral-100 p-4 rounded-lg">
                <h5 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-users text-secondary mr-2"></i>
                  Community Building
                </h5>
                <p className="text-sm text-neutral-600">
                  Shared humor creates bonds and identifies like-minded individuals
                </p>
              </div>
              
              <div className="bg-neutral-100 p-4 rounded-lg">
                <h5 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-comment-dots text-secondary mr-2"></i>
                  Conversation Starters
                </h5>
                <p className="text-sm text-neutral-600">
                  Memes break the ice and create pathways to deeper connections
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
