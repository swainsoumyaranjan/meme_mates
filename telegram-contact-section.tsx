import { useState } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const telegramSchema = z.object({
  message: z.string().min(3, "Message must be at least 3 characters long").max(1000, "Message cannot be longer than 1000 characters")
});

type TelegramFormValues = z.infer<typeof telegramSchema>;

export default function TelegramContactSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSending, setIsSending] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const form = useForm<TelegramFormValues>({
    resolver: zodResolver(telegramSchema),
    defaultValues: {
      message: ""
    }
  });
  
  async function onSubmit(data: TelegramFormValues) {
    try {
      setIsSending(true);
      
      const response = await fetch('/api/send-telegram-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Your message has been sent to our team via Telegram."
        });
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Telegram error:", error);
      toast({
        title: "Message Failed",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  }
  
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
    <section id="telegram-contact" className="py-20 bg-neutral-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Telegram <span className="text-primary">Chat</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Reach our team directly through Telegram for quick responses
          </p>
        </motion.div>
        
        <motion.div 
          className="mx-auto max-w-xl bg-white rounded-lg shadow-sm border border-neutral-200 p-6 md:p-8"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={1}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mr-4">
              <i className="text-blue-500 text-2xl fab fa-telegram-plane"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Send a Telegram Message</h3>
              <p className="text-neutral-600 text-sm">Get real-time responses from our team</p>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="What would you like to ask our team about MemeMates?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full flex items-center gap-2" 
                disabled={isSending}
              >
                {isSending ? (
                  <><div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin mr-2"></div> Sending...</>
                ) : (
                  <><i className="fab fa-telegram-plane mr-2"></i> Send via Telegram</>
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 pt-6 border-t border-neutral-200 text-sm text-neutral-500 text-center">
            <p>Messages will be received by our team in real-time via our Telegram bot</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}