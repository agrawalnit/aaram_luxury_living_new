import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Our Story</span>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-6">A Legacy of Luxury</h2>
            <p className="text-[#CCCCCC] mb-6">
              Aaram Luxury Living was founded with a singular vision: to create an unparalleled living experience that combines the comfort of home with the indulgence of a five-star hotel. Our exclusive property stands as a testament to craftsmanship, attention to detail, and a passion for luxury.
            </p>
            <p className="text-[#CCCCCC] mb-8">
              Each of our 22 meticulously designed rooms offers a unique experience, catering to both short stays and extended residences. From hand-selected furnishings to personalized concierge services, we've crafted every aspect of your stay to exceed expectations.
            </p>
            <div className="flex items-center space-x-6">
              <div>
                <span className="block text-[#D4AF37] text-3xl font-playfair font-bold">22</span>
                <span className="text-sm text-[#CCCCCC] uppercase tracking-wide">Luxury Rooms</span>
              </div>
              <div className="h-12 w-px bg-[#D4AF37]/30"></div>
              <div>
                <span className="block text-[#D4AF37] text-3xl font-playfair font-bold">24/7</span>
                <span className="text-sm text-[#CCCCCC] uppercase tracking-wide">Concierge</span>
              </div>
              <div className="h-12 w-px bg-[#D4AF37]/30"></div>
              <div>
                <span className="block text-[#D4AF37] text-3xl font-playfair font-bold">5★</span>
                <span className="text-sm text-[#CCCCCC] uppercase tracking-wide">Service</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative z-10">
              <img 
                src="/images/IMG_5138-HDR.jpg" 
                alt="Aaram Luxury Living space" 
                className="w-full h-auto object-cover rounded-sm shadow-lg"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-3/4 h-3/4 border-2 border-[#D4AF37] opacity-40 rounded-sm z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
