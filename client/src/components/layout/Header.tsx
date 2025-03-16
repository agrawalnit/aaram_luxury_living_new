import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Rooms", href: "/#rooms" },
    { name: "Amenities", href: "/#amenities" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-rich-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 border-b border-[#1E1E1E]">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-playfair font-bold tracking-wide text-[#D4AF37]">Aaram Luxury Living</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  // Only prevent default if it's a hash link on the current page
                  if (link.href.startsWith("/#") && location === "/") {
                    e.preventDefault();
                    const element = document.querySelector(link.href.substring(1));
                    if (element) {
                      window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY - 100,
                        behavior: "smooth",
                      });
                    }
                  }
                }}
                className="text-[#F5F5F5] hover:text-[#D4AF37] transition-all gold-underline text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a href="/rooms/1#contact">
              <Button 
                className="ml-4 px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] bg-transparent transition-all text-sm uppercase tracking-wider"
              >
                Book Now
              </Button>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#F5F5F5]"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-4/5 bg-[#1E1E1E] z-50 overflow-y-auto md:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-playfair font-bold tracking-wide text-[#D4AF37]">Aaram Luxury Living</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeMobileMenu} 
                  className="text-[#F5F5F5]"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      closeMobileMenu();
                      if (link.href.startsWith("/#") && location === "/") {
                        e.preventDefault();
                        setTimeout(() => {
                          const element = document.querySelector(link.href.substring(1));
                          if (element) {
                            window.scrollTo({
                              top: element.getBoundingClientRect().top + window.scrollY - 100,
                              behavior: "smooth",
                            });
                          }
                        }, 300);
                      }
                    }}
                    className="text-[#F5F5F5] hover:text-[#D4AF37] transition-all text-lg uppercase tracking-wider"
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="mt-4 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] bg-transparent transition-all text-lg uppercase tracking-wider"
                >
                  Book Now
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;