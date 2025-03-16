import { motion } from "framer-motion";
import { Headphones, Shield, Car } from "lucide-react";

const amenities = [
  {
    icon: Headphones,
    title: "24/7 Concierge",
    description:
      "Our dedicated staff is available around the clock to assist with any request, from restaurant reservations to travel arrangements.",
  },
  {
    icon: Shield,
    title: "Security Service",
    description:
      "Enjoy peace of mind with our comprehensive security system and 24-hour monitoring by professional staff.",
  },
  {
    icon: Car,
    title: "Coffee Shop/Patisserie",
    description:
      "Indulge in fresh coffee and delectable pastries at our in-house café.",
  },
];

const Amenities = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="amenities" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Property Features</span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-4">Exceptional Amenities</h2>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Experience a wealth of premium services and facilities designed to enhance your stay.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#2A2A2A] p-8 rounded-sm hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-300"
            >
              <amenity.icon className="text-[#D4AF37] h-8 w-8 mb-6" />
              <h3 className="font-playfair text-xl font-bold mb-3">{amenity.title}</h3>
              <p className="text-[#CCCCCC]">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;