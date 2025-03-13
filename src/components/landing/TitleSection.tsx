
import { motion } from "framer-motion";

const TitleSection = () => {
  return (
    <motion.div 
      className="mb-8 md:mb-16 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Left side astronaut - moved to leftmost position (0px) */}
      <motion.div 
        className="absolute -left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 z-10"
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
      
      {/* Right side rocket - kept the same */}
      <motion.div 
        className="absolute -right-4 sm:-right-8 md:-right-12 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 z-10"
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
      
      {/* SVG title text - kept the same */}
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
      
      {/* Background glow effect - kept the same */}
      <div className="absolute inset-0 w-full h-full opacity-70">
        <div className="absolute inset-0 bg-blue-500 blur-xl animate-pulse-glow opacity-30"></div>
        <div className="absolute inset-0 bg-cyan-400 blur-lg animate-pulse-glow opacity-30" style={{animationDelay: "0.5s"}}></div>
      </div>
    </motion.div>
  );
};

export default TitleSection;
