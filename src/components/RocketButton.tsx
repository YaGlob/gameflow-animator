
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface RocketButtonProps {
  text: string;
  to: string;
  delay?: number;
  direction?: "left" | "right";
}

const RocketButton: FC<RocketButtonProps> = ({ 
  text, 
  to, 
  delay = 0, 
  direction = "left" 
}) => {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleClick = () => {
    setIsLaunching(true);
    // The Link navigation will happen automatically after the animation plays
  };

  return (
    <motion.div
      className="relative group mb-10"
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 100
      }}
      onClick={handleClick}
    >
      <Link to={to} className="block">
        <div className={`flex items-center ${direction === "right" ? "flex-row-reverse" : "flex-row"}`}>
          {/* Rocket with animation */}
          <motion.div 
            className="relative z-10"
            animate={isLaunching ? { 
              x: direction === "left" ? -100 : 100,
              opacity: 0,
              transition: { duration: 0.5 }
            } : {}}
          >
            <svg width="90" height="50" viewBox="0 0 90 50" className="fill-white stroke-[1.5] stroke-red-500">
              {/* Rocket body */}
              <rect x="20" y="10" width="40" height="30" rx="5" />
              {/* Rocket nose */}
              <polygon points="15,25 20,10 20,40" fill="red" stroke="none" />
              {/* Window */}
              <circle cx="35" cy="25" r="7" fill="cyan" stroke="gray" />
              {/* Fins */}
              <polygon points="60,5 70,5 60,15" fill="red" stroke="none" />
              <polygon points="60,45 70,45 60,35" fill="red" stroke="none" />
            </svg>
            
            {/* Fire animation that shows when launching */}
            <AnimatePresence>
              {isLaunching && (
                <motion.div 
                  className={`absolute ${direction === "left" ? "right-full -mr-2" : "left-full -ml-2"} top-1/2 -translate-y-1/2`}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 40, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="40" height="30" viewBox="0 0 40 30">
                    <path
                      d="M0,15 Q10,5 20,15 Q30,25 40,15 Q30,5 20,15 Q10,25 0,15"
                      fill="url(#fireGradient)"
                    />
                    <defs>
                      <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF4500" />
                        <stop offset="50%" stopColor="#FF8C00" />
                        <stop offset="100%" stopColor="#FFFF00" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Smoke/cloud trail with text */}
          <motion.div 
            className={`relative z-0 bg-white/90 rounded-full flex items-center justify-center
                      ${direction === "left" 
                        ? "ml-2 pl-12 pr-8" 
                        : "mr-2 pr-12 pl-8"} 
                      py-4 h-20 shadow-md`}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 0.9 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            style={{
              clipPath: "ellipse(50% 50% at 50% 50%)"
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-50"
              animate={{
                scale: [1, 1.05, 1, 1.05, 1],
                x: [0, 2, 0, -2, 0],
                y: [0, -2, 0, 2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              style={{
                backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
                clipPath: "ellipse(55% 55% at 50% 50%)"
              }}
            />
            <span className="text-black font-extrabold text-xl md:text-2xl tracking-wider relative z-10">
              {text}
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RocketButton;
