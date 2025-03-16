import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Aaram Luxury Living property exterior" 
          className="object-cover w-full h-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 to-[#0A0A0A]/80"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl mb-6"
        >
          <span className="block">Experience Unrivaled</span>
          <span className="block text-[#D4AF37]">Luxury Living</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#CCCCCC] text-lg md:text-xl max-w-3xl mx-auto mb-12"
        >
          Where timeless elegance meets modern comfort. A collection of 22 exceptional rooms for your perfect stay.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button 
            onClick={() => scrollToSection('rooms')}
            className="px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] font-medium text-sm md:text-base uppercase tracking-wider hover:bg-[#E5C158] transition-all"
          >
            Explore Rooms
          </Button>
          <Button 
            onClick={() => scrollToSection('about')}
            variant="outline" 
            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] font-medium text-sm md:text-base uppercase tracking-wider transition-all"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <Button 
          onClick={() => scrollToSection('about')}
          variant="ghost" 
          className="text-[#D4AF37] animate-bounce"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
