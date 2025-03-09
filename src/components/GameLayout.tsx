import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

interface GameLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

const GameLayout = ({ children, showBackButton = true, backTo = "/" }: GameLayoutProps) => {
  return (
    <div className="game-layout min-h-screen w-full relative overflow-hidden">
      {/* Main background image - updated to fill the entire screen */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ 
          backgroundImage: "url('/images/game-background.png')", 
          backgroundSize: "100% 100%", // Changed to fill the entire screen
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Circuit board background image - increased opacity and adjusted z-index */}
      <div 
        className="absolute inset-0 z-[5]"
        style={{ 
          backgroundImage: "url('/lovable-uploads/e9839ed9-5020-4eb3-bbba-f19fdf3569a1.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1, // Further reduced opacity
          mixBlendMode: "soft-light",
        }}
      />
      
      {/* Particles background with lower density for game screens - moved below circuit board */}
      <div className="absolute inset-0 z-[2]">
        <SparklesCore
          id="gameParticles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={30} // Reduced for mobile performance
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>
      
      {/* Back button - larger touch target for mobile with improved positioning */}
      {showBackButton && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 left-3 sm:top-6 sm:left-6 z-50"
        >
          <Link 
            to={backTo} 
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white bg-blue-500/50 hover:bg-blue-500/70 backdrop-blur-sm rounded-full transition-colors touch-manipulation"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </motion.div>
      )}

      {/* Main content with increased z-index and mobile-friendly padding */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-3 sm:p-5 md:p-7">
        {children}
      </div>
    </div>
  );
};

export default GameLayout;
