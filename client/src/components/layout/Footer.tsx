import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1E1E1E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3 className="text-2xl font-playfair font-bold text-[#D4AF37] mb-6">Aaram Luxury Living</h3>
            <p className="text-[#CCCCCC] mb-6">
              Redefining luxury living with our exclusive collection of premium rooms and exceptional services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[#F5F5F5] font-medium uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">About Us</a></li>
              <li><a href="/#rooms" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Our Rooms</a></li>
              <li><a href="/#amenities" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Amenities</a></li>
              <li><a href="/#gallery" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Gallery</a></li>
              <li><a href="/#contact" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#F5F5F5] font-medium uppercase tracking-wider mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="/#rooms" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Short Stays</a></li>
              <li><a href="/#rooms" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Long Term Residences</a></li>
              <li><a href="/#amenities" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Concierge Services</a></li>
              <li><a href="/#amenities" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Dining Experience</a></li>
              <li><a href="/#amenities" className="text-[#CCCCCC] hover:text-[#D4AF37] transition-all">Spa & Wellness</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#1E1E1E] text-center md:flex md:justify-between md:text-left">
          <p className="text-[#CCCCCC] text-sm">
            &copy; {new Date().getFullYear()} Aaram Luxury Living. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] text-sm mx-3 md:mx-0 md:ml-6">Privacy Policy</a>
            <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] text-sm mx-3 md:ml-6">Terms of Service</a>
            <a href="#" className="text-[#CCCCCC] hover:text-[#D4AF37] text-sm mx-3 md:ml-6">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
