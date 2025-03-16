import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import MotionCard from "@/components/ui/motion-card";
import { Room } from "@shared/schema";

const Rooms = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: [filter ? `/api/rooms?stayType=${filter}` : '/api/rooms'],
  });

  const filterClasses = (filterType: string | null) => {
    return filter === filterType
      ? "text-sm uppercase tracking-wider text-[#F5F5F5] hover:text-[#D4AF37] transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[#D4AF37]"
      : "text-sm uppercase tracking-wider text-[#CCCCCC] hover:text-[#D4AF37] transition-all";
  };

  // Initial set of rooms to display (either all 6 or filtered by type)
  const displayedRooms = rooms?.slice(0, 6) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="rooms" className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Our Accommodations</span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-4">Exceptional Living Spaces</h2>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Discover our collection of 22 impeccably designed rooms, each offering a unique blend of comfort and sophistication.
          </p>
        </motion.div>
        
        {/* Room Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex space-x-8 border-b border-[#1E1E1E] pb-2">
            <button 
              onClick={() => setFilter(null)} 
              className={filterClasses(null)}
            >
              All Rooms
            </button>
            <button 
              onClick={() => setFilter('short')} 
              className={filterClasses('short')}
            >
              Without Kitchen
            </button>
            <button 
              onClick={() => setFilter('long')} 
              className={filterClasses('long')}
            >
              With Kitchen
            </button>
          </div>
        </motion.div>
        
        {/* Room Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-ratio-box relative rounded-sm overflow-hidden" style={{ paddingBottom: '66.67%' }}>
                <div className="absolute inset-0 bg-[#1E1E1E] animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedRooms.map((room) => (
              <motion.div key={room.id} variants={childVariants}>
                <MotionCard 
                  id={room.id}
                  name={room.name}
                  stayType={room.stayType}
                  price={room.price}
                  priceUnit={room.priceUnit}
                  imageUrl={room.imageUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all text-sm uppercase tracking-wider"
          >
            View All Rooms
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Rooms;
