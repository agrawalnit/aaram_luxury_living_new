import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Rooms from "@/components/home/Rooms";
import FeaturedRoom from "@/components/home/FeaturedRoom";
import Amenities from "@/components/home/Amenities";
import Gallery from "@/components/home/Gallery";
import BookingCTA from "@/components/home/BookingCTA";
import Contact from "@/components/home/Contact";
import MissionVision from "@/components/home/MissionVision";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Aaram Luxury Living | Premium Accommodation Experience</title>
        <meta name="description" content="Experience unrivaled luxury living at Aaram Luxury Living with our collection of 22 exceptional rooms for your perfect stay." />
      </Helmet>
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Rooms />
        <FeaturedRoom />
        <Amenities />
        <Gallery />
        <BookingCTA />
        <Contact />
        
        {/* Map Section - Placeholder */}
        <div className="h-96 relative bg-[#2A2A2A] flex items-center justify-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#D4AF37] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-[#CCCCCC]">Interactive location map would be displayed here</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
