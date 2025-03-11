import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BookingCTA = () => {
  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Luxurious property view" 
          className="object-cover w-full h-full opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 to-[#0A0A0A]/90"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-playfair font-bold text-3xl md:text-5xl mb-6"
        >
          <span className="block">Experience the Epitome of</span>
          <span className="block text-[#D4AF37]">Luxury Living</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#CCCCCC] text-lg max-w-2xl mx-auto mb-12"
        >
          Secure your place in our exclusive property. Whether for a night or an extended stay, a world of luxury awaits.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button 
            className="px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] font-medium text-base uppercase tracking-wider hover:bg-[#E5C158] transition-all"
          >
            Book Your Stay Now
          </Button>
          <Button 
            variant="outline"
            className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] font-medium text-base uppercase tracking-wider transition-all"
          >
            Contact Concierge
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;
