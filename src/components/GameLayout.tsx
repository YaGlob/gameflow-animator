
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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-950 to-slate-950">
      {/* Particles background with lower density for game screens */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="gameParticles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>
      
      {/* Circuit board background image with improved visibility */}
      <div 
        className="absolute inset-0 z-1"
        style={{ 
          backgroundImage: "url('/lovable-uploads/d6ab7bc7-4b5b-4cc8-8c05-42cec66a7fc4.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          mixBlendMode: "screen",
        }}
      />
      
      {/* Animated grid lines with reduced opacity */}
      <div className="absolute inset-0 z-1 opacity-10 bg-[linear-gradient(to_right,#4fd1ff_1px,transparent_1px),linear-gradient(to_bottom,#4fd1ff_1px,transparent_1px)]" style={{ backgroundSize: "40px 40px" }}></div>
      
      {/* Back button - larger touch target for mobile */}
      {showBackButton && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 left-6 z-50"
        >
          <Link 
            to={backTo} 
            className="flex items-center justify-center w-12 h-12 text-white bg-blue-500/30 hover:bg-blue-500/50 backdrop-blur-sm rounded-full transition-colors touch-manipulation"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </motion.div>
      )}

      {/* Main content with increased z-index and panel background opacity - adjusted padding to 30px */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-7">
        {children}
      </div>
    </div>
  );
};

export default GameLayout;
