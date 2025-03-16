import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface MotionCardProps {
  id: number;
  name: string;
  stayType?: string; // Made optional since we're not using it anymore
  price: number;
  priceUnit: string;
  imageUrl: string;
  className?: string;
}

const MotionCard = ({ 
  id, 
  name, 
  stayType, 
  price, 
  priceUnit, 
  imageUrl, 
  className 
}: MotionCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  const displayPrice = `${formattedPrice}/${priceUnit}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative overflow-hidden rounded-sm cursor-pointer", className)}
    >
      <div className="aspect-ratio-box relative overflow-hidden" style={{ paddingBottom: '66.67%' }}>
        <img 
          src={imageUrl} 
          alt={`${name} at Aaram Luxury Living`} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="font-playfair text-xl font-bold text-white">{name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#CCCCCC]">{displayPrice}</span>
          <div className="flex space-x-4 items-center">
            <Link href={`/rooms/${id}`} className="text-sm uppercase text-[#D4AF37] hover:text-[#E5C158] tracking-wider flex items-center">
              View Details <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a href="tel:+919876543210" className="text-sm uppercase text-white bg-[#D4AF37] hover:bg-[#E5C158] px-3 py-1 rounded tracking-wider flex items-center transition-colors">
              Call to Book
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MotionCard;
