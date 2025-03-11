import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest("POST", "/api/inquiries", data),
    onSuccess: () => {
      toast({
        title: "Thank you for your message!",
        description: "We will get back to you shortly.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error submitting form",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    inquiryMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Get In Touch</span>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-6">Contact Us</h2>
            <p className="text-[#CCCCCC] mb-8">
              We're here to answer any questions about our luxury accommodations. Whether you're planning a stay or interested in learning more, our dedicated team is ready to assist you.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className="text-[#D4AF37] w-8" />
                <div className="ml-4">
                  <h3 className="text-[#F5F5F5] font-medium">Location</h3>
                  <p className="text-[#CCCCCC]">123 Luxury Avenue, Prestigious District, City, 10001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-[#D4AF37] w-8" />
                <div className="ml-4">
                  <h3 className="text-[#F5F5F5] font-medium">Phone</h3>
                  <p className="text-[#CCCCCC]">+1 (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-[#D4AF37] w-8" />
                <div className="ml-4">
                  <h3 className="text-[#F5F5F5] font-medium">Email</h3>
                  <p className="text-[#CCCCCC]">reservations@luxehaven.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-[#F5F5F5] mb-2 text-sm">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#1E1E1E] focus:border-[#D4AF37] outline-none text-[#F5F5F5] rounded-sm" 
                            placeholder="John Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-[#F5F5F5] mb-2 text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="email" 
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#1E1E1E] focus:border-[#D4AF37] outline-none text-[#F5F5F5] rounded-sm" 
                            placeholder="john@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-[#F5F5F5] mb-2 text-sm">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#1E1E1E] focus:border-[#D4AF37] outline-none text-[#F5F5F5] rounded-sm" 
                          placeholder="Booking Inquiry"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-[#F5F5F5] mb-2 text-sm">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={5} 
                          className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#1E1E1E] focus:border-[#D4AF37] outline-none text-[#F5F5F5] rounded-sm resize-none" 
                          placeholder="Your message here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={inquiryMutation.isPending}
                  className="w-full px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] font-medium text-sm uppercase tracking-wider hover:bg-[#E5C158] transition-all"
                >
                  {inquiryMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
