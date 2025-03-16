import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BookingCTA = () => {
  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/IMG_5144-HDR.jpg" 
          alt="Aaram Luxury Living property view" 
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
          className="flex flex-col gap-4"
        >
          <div className="text-center mb-4">
            <p className="text-[#F5F5F5] mb-1">For bookings and inquiries, please contact us at:</p>
            <p className="text-[#D4AF37] font-medium text-xl">+91 98765 43210</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#rooms" className="w-full sm:w-auto">
              <Button 
                className="w-full px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] font-medium text-base uppercase tracking-wider hover:bg-[#E5C158] transition-all"
              >
                View Our Rooms
              </Button>
            </a>
            <a href="tel:+919876543210" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] font-medium text-base uppercase tracking-wider transition-all"
              >
                Call to Book
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;
