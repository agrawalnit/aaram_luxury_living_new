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
        
        {/* Map Section */}
        <div className="h-96 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6955487182266!2d77.0573!3d28.4546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19c176290bc7%3A0x27c6b28ccbf6066b!2sSector%2042%2C%20Gurugram%2C%20Haryana%20122001!5e0!3m2!1sen!2sin!4v1689825655157!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
