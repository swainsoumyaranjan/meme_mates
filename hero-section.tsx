import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-[#fff] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ff4500%27%20fill-opacity%3D%270.08%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
              Connect Through <span className="text-primary">Memes</span>, Build <span className="text-secondary">Relationships</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              MemeMates is revolutionizing social connections by leveraging the universal language of memes to create meaningful interactions in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#apps">
                <Button variant="default" className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                  Explore Our Apps
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="border border-neutral-300 hover:bg-neutral-100 text-neutral-800 w-full sm:w-auto">
                  Join the Waitlist
                </Button>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                className="absolute -top-6 -left-6 w-64 h-64 bg-primary rounded-full opacity-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary rounded-full opacity-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  delay: 1,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-2">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="People enjoying memes together" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-primary flex items-center">
                      <i className="fas fa-fire mr-2"></i> Trending Memes
                    </span>
                    <span className="bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-secondary flex items-center">
                      <i className="fas fa-users mr-2"></i> Social Connection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <a href="#intro" className="text-neutral-400 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
