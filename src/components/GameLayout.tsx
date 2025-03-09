
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
      {/* Circuit board background image - increased opacity and adjusted z-index */}
      <div 
        className="absolute inset-0 z-[5]"
        style={{ 
          backgroundImage: "url('/lovable-uploads/e9839ed9-5020-4eb3-bbba-f19fdf3569a1.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
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
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>
      
      {/* Animated grid lines with reduced opacity - moved below circuit board */}
      <div className="absolute inset-0 z-[3] opacity-20 bg-[linear-gradient(to_right,#4fd1ff_1px,transparent_1px),linear-gradient(to_bottom,#4fd1ff_1px,transparent_1px)]" style={{ backgroundSize: "40px 40px" }}></div>
      
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

      {/* Main content with increased z-index */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-7">
        {children}
      </div>
    </div>
  );
};

export default GameLayout;
