import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
      <Helmet>
        <title>Page Not Found | Aaram Luxury Living</title>
        <meta name="description" content="The page you are looking for cannot be found. Navigate back to Aaram Luxury Living." />
      </Helmet>
      <div className="w-full max-w-md mx-4 p-8 bg-[#1E1E1E] border border-[#2A2A2A] rounded-sm">
        <div className="flex items-center mb-6 gap-3">
          <AlertCircle className="h-8 w-8 text-[#D4AF37]" />
          <h1 className="text-2xl font-bold text-white font-playfair">Page Not Found</h1>
        </div>

        <p className="mt-4 text-[#CCCCCC] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        
        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E5C158] transition-all"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
