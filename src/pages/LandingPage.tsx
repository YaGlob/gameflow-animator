
import { useNavigate } from "react-router-dom";
import RobotScene from "@/components/RobotScene";
import { Play } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import LottiePlanets from "@/components/LottiePlanets";
import LottieAstronaut from "@/components/LottieAstronaut";
import { Boxes } from "@/components/ui/background-boxes";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-950 to-slate-950">
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.8}
        />
      </div>

      {/* Lottie Planets */}
      <LottiePlanets />

      {/* Lottie Astronaut */}
      <LottieAstronaut />

      {/* Content container */}
      <div className="relative z-20 flex flex-col items-center justify-center h-screen p-4">
        {/* Curved neon title with gradients */}
        <motion.div 
          className="mb-12 md:mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Arc path for text - this is invisible but used for the text path */}
          <svg className="w-[320px] h-[100px] md:w-[480px] md:h-[150px]" viewBox="0 0 480 150" style={{ overflow: 'visible' }}>
            <defs>
              <path id="textArc" d="M 20,100 Q 240,30 460,100" fill="none" />
              <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4fd1ff" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#4fd1ff" />
              </linearGradient>
            </defs>
            
            {/* Glow effects behind the text */}
            <text>
              <textPath href="#textArc" textAnchor="middle" startOffset="50%">
                <tspan className="text-[35px] md:text-[45px] font-bold tracking-wider fill-blue-200 filter blur-lg opacity-70">
                  Letter Venture
                </tspan>
              </textPath>
            </text>
            
            {/* Actual text that follows the path */}
            <text>
              <textPath href="#textArc" textAnchor="middle" startOffset="50%">
                <tspan className="text-[35px] md:text-[45px] font-bold tracking-wider fill-[url(#titleGradient)]">
                  Letter Venture
                </tspan>
              </textPath>
            </text>
          </svg>
          
          {/* Neon animation effects */}
          <div className="absolute inset-0 w-full h-full opacity-60">
            <div className="absolute inset-0 bg-blue-500 blur-xl animate-pulse-glow opacity-20"></div>
            <div className="absolute inset-0 bg-cyan-400 blur-lg animate-pulse-glow opacity-20" style={{animationDelay: "0.5s"}}></div>
          </div>
        </motion.div>

        {/* Play button - slightly smaller on mobile */}
        <motion.button 
          onClick={() => navigate("/game")}
          className="relative bg-blue-500 text-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all hover:scale-105 focus:outline-none z-30"
          aria-label="Play game"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(79, 209, 255, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-70"></div>
          
          {/* Button content */}
          <div className="relative bg-blue-500 hover:bg-blue-600 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center z-10">
            <Play size={30} fill="white" className="ml-2 md:ml-2 md:size-[40px]" />
          </div>
        </motion.button>
      </div>

      {/* Grid Box Background - Adjusted to be 30px smaller in height */}
      <div className="absolute bottom-0 left-0 w-full h-[calc(50%-30px)] overflow-hidden z-10">
        {/* Gradient overlay for better visibility of elements above the grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-950/90 z-20 pointer-events-none" />
        <Boxes className="scale-150 z-10" />
      </div>

      {/* Educational elements floating */}
      <div className="absolute top-1/4 left-10 md:left-20 hidden sm:block">
        <motion.div 
          className="bg-gradient-to-r from-blue-400/30 to-purple-400/30 backdrop-blur-sm p-3 rounded-lg border border-blue-300/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ y: -5, boxShadow: "0 0 15px rgba(79, 209, 255, 0.5)" }}
        >
          <div className="text-white text-lg font-bold">ABC</div>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-10 md:right-20 hidden sm:block">
        <motion.div 
          className="bg-gradient-to-r from-green-400/30 to-teal-400/30 backdrop-blur-sm p-3 rounded-lg border border-green-300/30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ y: -5, boxShadow: "0 0 15px rgba(79, 209, 255, 0.5)" }}
        >
          <div className="text-white text-lg font-bold">123</div>
        </motion.div>
      </div>
      
      {/* Robot character in bottom right - using our new 3D robot */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <RobotScene variant="happy" />
      </div>

      {/* Mobile-friendly indicators */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-40">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <div className="text-xs text-white/80">Mobile Ready</div>
      </div>
    </div>
  );
};

export default LandingPage;
