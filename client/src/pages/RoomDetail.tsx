import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Bed, Bath, User, Coffee, Wifi, Tv, Loader2, CalendarIcon, Check, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Room } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet';

const RoomDetail = () => {
  const [, params] = useRoute("/rooms/:id");
  const roomId = params?.id ? parseInt(params.id) : 0;
  
  // We don't need these states anymore, but keeping the reference in case
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);
  
  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Collection of room images (all property images available)
  const propertyImages = [
    '/images/IMG_5116-HDR.jpg',
    '/images/IMG_5120-HDR.jpg',
    '/images/IMG_5123-HDR.jpg',
    '/images/IMG_5135-HDR.jpg',
    '/images/IMG_5138-HDR.jpg',
    '/images/IMG_5144-HDR.jpg',
    '/images/IMG_5150-HDR.jpg',
    '/images/IMG_5153-HDR.jpg',
    '/images/IMG_5159-HDR.jpg',
    '/images/IMG_5162-HDR.jpg',
    '/images/IMG_5165-HDR.jpg',
    '/images/IMG_5177-HDR.jpg'
  ];
  
  const { data: room, isLoading } = useQuery<Room>({
    queryKey: [`/api/rooms/${roomId}`],
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <p className="text-[#CCCCCC] mb-8">The room you're looking for doesn't exist or has been removed.</p>
          <a href="/#rooms" className="text-[#D4AF37] hover:underline">Back to rooms</a>
        </div>
      </div>
    );
  }
  
  // Navigation functions for the image carousel
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % propertyImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
    );
  };
  
  // Use standard prices based on room type
  const price = room.name.toLowerCase().includes('twin') || room.name.toLowerCase().includes('shared') 
    ? 25000 
    : 50000;
    
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
  
  const displayPrice = `${formattedPrice} / ${room.priceUnit}`;
    
  return (
    <div>
      <Helmet>
        <title>{room.name} | Aaram Luxury Living</title>
        <meta name="description" content={`Experience the luxury of our ${room.name} at Aaram Luxury Living. Book your stay in this premium accommodation today.`} />
      </Helmet>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Room Details - 2/3 width */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Room Image Carousel */}
                <div className="rounded-sm overflow-hidden mb-8 relative">
                  {/* Using additional property images */}
                  {propertyImages.length > 0 && (
                    <>
                      <img 
                        src={propertyImages[currentImageIndex]} 
                        alt={`${room.name} at Aaram Luxury Living`} 
                        className="w-full h-[500px] object-cover transition-opacity duration-500"
                      />
                      
                      {/* Navigation Buttons */}
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <button 
                          onClick={prevImage}
                          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {propertyImages.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Room Info */}
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">
                        Luxury Accommodation
                      </span>
                      <h1 className="font-playfair font-bold text-3xl md:text-4xl mt-2">{room.name}</h1>
                    </div>
                    <div className="text-right">
                      <span className="block text-[#D4AF37] text-2xl font-playfair font-bold">{formattedPrice}</span>
                      <span className="text-[#CCCCCC] text-sm">per {room.priceUnit}</span>
                    </div>
                  </div>
                  
                  <p className="text-[#CCCCCC] mb-6">{room.description}</p>
                  
                  {/* Room Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {Array.isArray(room.amenities) && room.amenities.map((amenity: string, index: number) => {
                      // Use different icons based on amenity name or index
                      let Icon = Check;
                      if (amenity.toLowerCase().includes('bed')) Icon = Bed;
                      else if (amenity.toLowerCase().includes('bath')) Icon = Bath;
                      else if (amenity.toLowerCase().includes('wifi')) Icon = Wifi;
                      else if (amenity.toLowerCase().includes('tv')) Icon = Tv;
                      else if (amenity.toLowerCase().includes('coffee')) Icon = Coffee;
                      
                      return (
                        <div key={index} className="flex items-center">
                          <Icon className="text-[#D4AF37] mr-3" size={18} />
                          <span className="text-[#F5F5F5]">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="bg-[#2A2A2A] my-8" />
                  
                  {/* Room Details */}
                  <div>
                    <h2 className="font-playfair font-bold text-2xl mb-4">Room Details</h2>
                    <p className="text-[#CCCCCC] mb-6">
                      Our {room.name} provides the perfect blend of comfort and luxury. Designed with meticulous attention to detail, this room offers an exceptional living experience with premium amenities and furnishings.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium text-xl mb-3">Room Amenities</h3>
                        <ul className="text-[#CCCCCC] space-y-2">
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Daily housekeeping</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Premium bedding</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>High-speed Wi-Fi</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Smart TV with streaming</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Luxury toiletries</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-xl mb-3">Property Access</h3>
                        <ul className="text-[#CCCCCC] space-y-2">
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>24/7 concierge service</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>24-hour security</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Daily cleaning service</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Complimentary coffee & tea</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="text-[#D4AF37] mr-2" size={16} />
                            <span>Secure parking</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Booking Sidebar - 1/3 width */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1E1E1E] p-6 rounded-sm sticky top-28"
              >
                <h2 className="font-playfair font-bold text-2xl mb-4">Contact Us</h2>
                <p className="text-[#CCCCCC] mb-6">
                  To inquire about this room or make a reservation, please contact us directly using the information below.
                </p>
                
                <div className="space-y-6">                  
                  {/* Price Display */}
                  <div className="flex justify-between items-center py-4 border-t border-b border-[#2A2A2A]">
                    <span className="text-[#F5F5F5]">
                      {displayPrice}
                    </span>
                    <span className="text-[#CCCCCC]">
                      {room.priceUnit === 'night' ? 'Minimum stay: 1 night' : 'Minimum stay: 1 month'}
                    </span>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="text-[#D4AF37] mr-3" size={18} />
                      <a href="tel:+919876543210" className="text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">+91 98765 43210</a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-[#D4AF37] mr-3" size={18} />
                      <a href="mailto:info@aaramluxuryliving.com" className="text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">info@aaramluxuryliving.com</a>
                    </div>
                  </div>
                  
                  <div className="bg-[#0A0A0A]/30 p-4 rounded-sm">
                    <p className="text-center text-[#CCCCCC]">Our concierge is available 24/7 to assist with your booking and any inquiries.</p>
                  </div>
                  
                  {/* Contact Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <a href="tel:+919876543210" className="w-full">
                      <Button className="w-full text-center py-6 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E5C158] transition-all">
                        <span className="uppercase font-medium tracking-wider">Call Us</span>
                      </Button>
                    </a>
                    <a href="mailto:info@aaramluxuryliving.com" className="w-full">
                      <Button variant="outline" className="w-full text-center py-6 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all">
                        <span className="uppercase font-medium tracking-wider">Email Us</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
