
import { FC } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface RocketButtonProps {
  text: string;
  to: string;
  delay?: number;
}

const RocketButton: FC<RocketButtonProps> = ({ text, to, delay = 0 }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.05 }}
    >
      <Link to={to} className="block">
        <div className="flex items-center">
          {/* Rocket with animation */}
          <div className="relative z-10">
            <svg width="120" height="60" viewBox="0 0 120 60" className="fill-white stroke-[3] stroke-red-500">
              {/* Rocket body */}
              <rect x="30" y="10" width="50" height="40" rx="5" />
              {/* Rocket nose */}
              <polygon points="10,30 30,10 30,50" fill="red" stroke="none" />
              {/* Window */}
              <circle cx="45" cy="30" r="8" fill="cyan" stroke="gray" />
              {/* Fins */}
              <polygon points="80,5 95,5 80,20" fill="red" stroke="none" />
              <polygon points="80,55 95,55 80,40" fill="red" stroke="none" />
            </svg>
          </div>
          
          {/* Cloud/smoke trail with animation */}
          <motion.div 
            className="absolute left-[100px] z-0 w-64 h-24 bg-white/80 rounded-r-full"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          >
            <div className="flex items-center justify-center h-full">
              <span className="text-black font-extrabold text-xl md:text-2xl tracking-wider">
                {text}
              </span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RocketButton;
