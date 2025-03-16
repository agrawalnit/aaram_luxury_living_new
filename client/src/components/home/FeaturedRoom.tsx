import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bed, Bath, Sofa, Utensils } from "lucide-react";
import { Room } from "@shared/schema";

const FeaturedRoom = () => {
  const { data: featuredRoom, isLoading } = useQuery<Room>({
    queryKey: ['/api/featured-room'],
  });

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-[#1E1E1E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-32 bg-[#2A2A2A] rounded"></div>
              <div className="h-10 w-3/4 bg-[#2A2A2A] rounded"></div>
              <div className="h-4 w-full bg-[#2A2A2A] rounded"></div>
              <div className="h-4 w-full bg-[#2A2A2A] rounded"></div>
              <div className="h-4 w-3/4 bg-[#2A2A2A] rounded"></div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-[#2A2A2A] rounded"></div>
                <div className="h-20 w-full bg-[#2A2A2A] rounded"></div>
              </div>
              <div className="flex space-x-4">
                <div className="h-12 w-40 bg-[#2A2A2A] rounded"></div>
                <div className="h-12 w-40 bg-[#2A2A2A] rounded"></div>
              </div>
            </div>
            <div className="relative animate-pulse">
              <div className="relative z-10 overflow-hidden rounded-sm">
                <div className="w-full h-80 bg-[#2A2A2A] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredRoom) {
    return null;
  }

  // Use standard prices based on room type
  const price = featuredRoom.name.toLowerCase().includes('twin') || featuredRoom.name.toLowerCase().includes('shared') 
    ? 25000 
    : 50000;
    
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  const displayPrice = `${formattedPrice}/${featuredRoom.priceUnit}`;

  return (
    <section className="py-20 md:py-28 bg-[#1E1E1E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">
              {featuredRoom.stayType === 'long' ? 'Featured Room With Kitchen' : 'Featured Room Without Kitchen'}
            </span>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-2 mb-6">{featuredRoom.name}</h2>
            
            <p className="text-[#CCCCCC] mb-6">
              {featuredRoom.description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {(featuredRoom.amenities as string[]).slice(0, 4).map((amenity: string, index: number) => {
                const Icon = index === 0 ? Bed : 
                             index === 1 ? Bath : 
                             index === 2 ? Sofa : 
                             Utensils;
                             
                return (
                  <div key={index} className="flex items-start">
                    <Icon className="text-[#D4AF37] mr-3 mt-1" />
                    <div>
                      <h3 className="text-[#F5F5F5] font-medium">{amenity}</h3>
                      <p className="text-[#CCCCCC] text-sm">Premium quality</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`/rooms/${featuredRoom.id}`}>
                <Button className="px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] font-medium text-sm uppercase tracking-wider hover:bg-[#E5C158] transition-all">
                  View Room Details
                </Button>
              </a>
              <a href={`/rooms/${featuredRoom.id}`}>
                <Button variant="outline" className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all text-sm uppercase tracking-wider">
                  Take a Virtual Tour
                </Button>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden rounded-sm">
              <img 
                src={featuredRoom.imageUrl} 
                alt={featuredRoom.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-3/4 h-3/4 border-2 border-[#D4AF37] opacity-40 rounded-sm z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
