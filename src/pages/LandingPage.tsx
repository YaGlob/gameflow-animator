import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import LottiePlanets from "@/components/LottiePlanets";
import LottieAstronaut from "@/components/LottieAstronaut";
import StarBackground from "@/components/StarBackground";

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    console.log("Play button clicked, navigating to /game");
    navigate("/game");
  };

  return (
    <div className="landing-page relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-950 to-slate-950">
      <StarBackground starCount={200} shootingStarCount={8} cometCount={3} />
      
      <div className="absolute top-0 left-0 z-30 w-32 h-32 md:w-48 md:h-48">
        <motion.img 
          src="/lovable-uploads/312be9c1-6dc4-4ed8-9ec0-4205fa0b3791.png"
          alt="Abstract line art"
          className="w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 w-32 h-32 md:w-48 md:h-48">
        <motion.img 
          src="/lovable-uploads/a317a535-c4fd-480b-8c2f-92a1b62372d2.png"
          alt="Saturn and Neptune planets"
          className="w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="scale-75 sm:scale-100">
        <LottiePlanets />
      </div>

      <div className="hidden sm:block">
        <LottieAstronaut />
      </div>

      <motion.div 
        className="absolute -right-8 sm:-right-16 md:-right-20 top-1/2 transform -translate-y-[calc(50%+35px)] w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img 
          src="/lovable-uploads/07f29c02-56f3-4736-90e4-733c2614987c.png" 
          alt="Rocket" 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center justify-center h-screen p-4">
        <motion.div 
          className="mb-8 md:mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="absolute -left-8 sm:-left-16 md:-left-20 top-1/2 transform -translate-y-[calc(50%+35px)] w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src="/lovable-uploads/16a42520-7787-4f2a-822c-6663a3067777.png" 
              alt="Astronaut" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          
          <svg className="w-[280px] h-[80px] md:w-[480px] md:h-[150px]" viewBox="0 0 480 150" style={{ overflow: 'visible' }}>
            <defs>
              <path id="textArc" d="M 20,100 Q 240,30 460,100" fill="none" />
              <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4fd1ff" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#4fd1ff" />
              </linearGradient>
              
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4fd1ff">
                  <animate attributeName="stop-color" 
                    values="#4fd1ff; #ffffff; #4fd1ff" 
                    dur="4s" 
                    repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#ffffff">
                  <animate attributeName="stop-color" 
                    values="#ffffff; #4fd1ff; #ffffff" 
                    dur="4s" 
                    repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#4fd1ff">
                  <animate attributeName="stop-color" 
                    values="#4fd1ff; #ffffff; #4fd1ff" 
                    dur="4s" 
                    repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            
            <text>
              <textPath href="#textArc" textAnchor="middle" startOffset="50%">
                <tspan className="text-[28px] md:text-[45px] font-bold tracking-wider fill-blue-200 filter blur-lg opacity-70">
                  Letter Venture
                </tspan>
              </textPath>
            </text>
            
            <text filter="url(#glow)">
              <textPath href="#textArc" textAnchor="middle" startOffset="50%">
                <tspan className="text-[28px] md:text-[45px] font-bold tracking-wider fill-[url(#animatedGradient)]">
                  Letter Venture
                </tspan>
              </textPath>
            </text>
          </svg>
          
          <div className="absolute inset-0 w-full h-full opacity-70">
            <div className="absolute inset-0 bg-blue-500 blur-xl animate-pulse-glow opacity-30"></div>
            <div className="absolute inset-0 bg-cyan-400 blur-lg animate-pulse-glow opacity-30" style={{animationDelay: "0.5s"}}></div>
          </div>
        </motion.div>
      </div>

      <motion.button 
        onClick={handlePlayClick}
        className="absolute left-[calc(50%-65px)] top-[calc(50%+20px)] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-all hover:scale-105 focus:outline-none z-40"
        aria-label="Play game"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 0 25px rgba(79, 209, 255, 0.8)",
          rotate: 5
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-80 animate-pulse"></div>
        
        <div className="relative bg-blue-500 hover:bg-blue-600 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center z-10">
          <Play size={30} fill="white" className="ml-2 md:size-[50px]" />
        </div>
      </motion.button>

      <div className="absolute bottom-0 left-0 w-full h-[calc(50%-80px)] overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-950/90 z-20 pointer-events-none" />
        
        <div className="w-full h-full">
          <img 
            src="/lovable-uploads/9a6b5a08-55d5-4aa8-870e-be05924df1fa.png" 
            alt="Grid Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <motion.img 
          src="/lovable-uploads/84d8b662-3d50-4987-b5bb-d912afa6292c.png" 
          alt="Education with Robot" 
          className="w-full object-contain"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>

      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex items-center space-x-2 z-40">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <div className="text-xs text-white/80">Mobile Ready</div>
      </div>
    </div>
  );
};

export default LandingPage;
