import { motion } from "framer-motion";

const MissionVision = () => {
  return (
    <section className="py-20 md:py-28 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Our Purpose</span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-4">Mission & Vision</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] p-10 rounded-sm border-l-4 border-[#D4AF37]"
          >
            <h3 className="font-playfair font-bold text-2xl mb-4 text-white">Mission Statement</h3>
            <p className="text-[#CCCCCC] mb-4">
              At Aaram Luxury Living, we are committed to redefining the essence of luxury living by providing an unparalleled lifestyle experience. Situated in the heart of Gurugram, right on the prestigious Golf Course Road, we offer exceptional hospitality, state-of-the-art amenities, and bespoke services.
            </p>
            <p className="text-[#CCCCCC]">
              Our mission is to create a serene and opulent sanctuary where comfort meets sophistication, ensuring every moment spent with us is one of pure indulgence and tranquility.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] p-10 rounded-sm border-r-4 border-[#D4AF37]"
          >
            <h3 className="font-playfair font-bold text-2xl mb-4 text-white">Vision Statement</h3>
            <p className="text-[#CCCCCC] mb-4">
              To become the leading name in luxury real estate in India, offering a portfolio of extraordinary properties that set new standards for elegance, comfort, and hospitality.
            </p>
            <p className="text-[#CCCCCC]">
              At Aaram Luxury Living, we envision a future where our brand symbolizes trust, exclusivity, and an unwavering commitment to providing a life of unparalleled luxury and sophistication, making every resident feel like royalty.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;