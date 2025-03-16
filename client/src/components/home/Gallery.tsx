import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Gallery images
const galleryImages = [
  {
    src: "/images/IMG_5120-HDR.jpg",
    alt: "Aaram Luxury Living premium accommodation"
  },
  {
    src: "/images/IMG_5120-HDR.jpg",
    alt: "Aaram Luxury Living elegant room"
  },
  {
    src: "/images/IMG_5120-HDR.jpg",
    alt: "Aaram Luxury Living comfortable space"
  },
  {
    src: "/images/IMG_5120-HDR.jpg",
    alt: "Aaram Luxury Living modern design"
  },
  {
    src: "/images/IMG_5120-HDR.jpg",
    alt: "Aaram Luxury Living luxury experience"
  },
  {
    src: "/images/IMG_5120-HDR.jpg",
    alt: "Aaram Luxury Living exquisite detail"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  
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
    <section id="gallery" className="py-20 md:py-28 bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Visual Tour</span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-4">Property Gallery</h2>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Explore our stunning spaces through this curated collection of images.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  variants={itemVariants}
                  className="overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-80 object-cover hover:scale-105 transition-all duration-500"
                  />
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl border-[#1E1E1E] bg-[#0A0A0A]/95 backdrop-blur-sm">
                <div className="p-1">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <p className="text-center mt-4 text-[#CCCCCC]">{image.alt}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all text-sm uppercase tracking-wider"
          >
            View Full Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
