import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Bed, Bath, User, Coffee, Wifi, Tv, Loader2, CalendarIcon, Check } from "lucide-react";
import { Room } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet';

const RoomDetail = () => {
  const [, params] = useRoute("/rooms/:id");
  const roomId = params?.id ? parseInt(params.id) : 0;
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);
  
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
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(room.price / 100);
  
  const displayPrice = room.priceUnit === 'night' 
    ? `${formattedPrice} / night`
    : `${formattedPrice} / month`;
    
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
                {/* Room Image */}
                <div className="rounded-sm overflow-hidden mb-8">
                  <img 
                    src={room.imageUrl} 
                    alt={`${room.name} at Aaram Luxury Living`} 
                    className="w-full h-[500px] object-cover"
                  />
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
                <h2 className="font-playfair font-bold text-2xl mb-4">Book This Room</h2>
                <p className="text-[#CCCCCC] mb-6">
                  Select your dates and preferences to check availability and reserve your stay.
                </p>
                
                <div className="space-y-6">
                  {/* Date Picker */}
                  <div>
                    <span className="block text-[#F5F5F5] mb-2">Check-in Date</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex justify-between border-[#2A2A2A] bg-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-[#F5F5F5] text-[#F5F5F5]"
                        >
                          {date ? format(date, "PPP") : <span>Select date</span>}
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-[#2A2A2A] bg-[#1E1E1E]">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-[#1E1E1E] text-[#F5F5F5]"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Guest Selection */}
                  <div>
                    <span className="block text-[#F5F5F5] mb-2">Guests</span>
                    <div className="flex border border-[#2A2A2A] rounded-sm">
                      <Button 
                        variant="ghost" 
                        className="text-[#F5F5F5] hover:text-[#D4AF37]"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <div className="flex-grow flex items-center justify-center text-[#F5F5F5]">
                        {guests} {guests === 1 ? "Guest" : "Guests"}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-[#F5F5F5] hover:text-[#D4AF37]"
                        onClick={() => setGuests(Math.min(4, guests + 1))}
                        disabled={guests >= 4}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  {/* Price Display */}
                  <div className="flex justify-between items-center py-4 border-t border-b border-[#2A2A2A]">
                    <span className="text-[#F5F5F5]">
                      {displayPrice}
                    </span>
                    <span className="text-[#CCCCCC]">
                      {room.priceUnit === 'night' ? 'Minimum stay: 1 night' : 'Minimum stay: 1 month'}
                    </span>
                  </div>
                  
                  {/* Book Button */}
                  <Button className="w-full text-center py-6 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E5C158] transition-all">
                    <span className="uppercase font-medium tracking-wider">Book Now</span>
                  </Button>
                  
                  {/* Or Contact */}
                  <div className="text-center">
                    <span className="text-[#CCCCCC]">or</span>
                    <Button variant="link" className="text-[#D4AF37] hover:text-[#E5C158]">
                      Contact for Special Requests
                    </Button>
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
