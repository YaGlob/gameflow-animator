import { FC, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
  const lottieRef = useRef<any>(null);

  const handleClick = () => {
    setIsLaunching(true);
    
    // Play the animation at higher speed to show launching
    if (lottieRef.current) {
      lottieRef.current.play();
      lottieRef.current.setSpeed(2); // Increase animation speed
    }
    
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
          {/* Lottie Rocket with animation - rotated 90 degrees */}
          <motion.div 
            className="relative z-10"
            animate={isLaunching ? { 
              x: direction === "left" ? -100 : 100,
              opacity: 0,
              transition: { duration: 0.5 }
            } : {}}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32" style={{ transform: 'rotate(-90deg)' }}>
              <DotLottieReact
                ref={lottieRef}
                src="https://lottie.host/d212e7a5-a203-419e-9f5b-cda06f326903/4jZK91W18f.lottie"
                loop={!isLaunching}
                autoplay
                className="w-full h-full"
              />
            </div>
            
            {/* Fire animation that shows when launching */}
            <AnimatePresence>
              {isLaunching && (
                <motion.div 
                  className={`absolute ${direction === "left" ? "bottom-0 left-1/2 -translate-x-1/2" : "bottom-0 left-1/2 -translate-x-1/2"}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 50, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: direction === "left" ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                >
                  <svg width="50" height="40" viewBox="0 0 40 30">
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
                        ? "ml-2 pl-14 pr-10" 
                        : "mr-2 pr-14 pl-10"} 
                      py-5 h-24 shadow-md`}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 0.9 }}
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
            <span className="text-black font-extrabold text-2xl md:text-3xl tracking-wider relative z-10">
              {text}
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RocketButton;
