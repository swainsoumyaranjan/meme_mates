import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/login", data);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        
        // In a real app, we would store the user data in a context or state management
        // For now, just redirect to home
        setLocation("/home");
      } else {
        toast({
          title: "Error",
          description: result.message || "Login failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
        <motion.div 
          className="bg-white px-6 py-8 rounded-lg shadow-sm w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-heading mb-2">Welcome Back!</h1>
            <p className="text-neutral-600">Log in to your MemeMates account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your username" 
                        {...field} 
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field} 
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Don't have an account? 
              <Link href="/register" className="text-primary ml-1 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setLocation("/home")}
            >
              <i className="fas fa-home"></i>
              View Website
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}