
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Main background image */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ 
          backgroundImage: "url('/images/game-background.png')", 
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Particles background */}
      <div className="absolute inset-0 z-[2]">
        <SparklesCore
          id="notFoundParticles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border-2 border-blue-300/30 text-center max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-4 text-white"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p 
          className="text-xl text-blue-200 mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Oops! This page is lost in space
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/game">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 text-lg font-bold">
              RETURN TO BASE
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
