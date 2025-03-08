
import { FC } from "react";
import { motion } from "framer-motion";

interface RobotProps {
  className?: string;
}

const Robot: FC<RobotProps> = ({ className = "" }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Robot body - more futuristic with rounded edges */}
      <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl flex flex-col items-center justify-center relative">
        {/* Robot head */}
        <motion.div 
          className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl shadow-md absolute -top-8 sm:-top-10"
          animate={{ 
            rotateZ: [0, 2, 0, -2, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut" 
          }}
        >
          {/* Robot eyes */}
          <div className="flex space-x-2 justify-center pt-4">
            <motion.div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                delay: 0.5,
                repeatType: "reverse" 
              }}
            />
          </div>
          
          {/* Robot antennas */}
          <div className="absolute -top-3 right-2 w-1 sm:w-1.5 h-4 sm:h-5 bg-gray-400 rounded-full">
            <motion.div 
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400 absolute -top-1.5"
              animate={{ 
                backgroundColor: ['#60a5fa', '#34d399', '#818cf8', '#60a5fa'] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3 
              }}
            />
          </div>
        </motion.div>
        
        {/* Robot body details */}
        <div className="absolute top-8 sm:top-10 left-0 right-0 flex justify-center">
          <motion.div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-400 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 rgba(59, 130, 246, 0.4)', 
                '0 0 15px rgba(59, 130, 246, 0.7)', 
                '0 0 0 rgba(59, 130, 246, 0.4)'
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 
            }}
          >
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-blue-200" />
          </motion.div>
        </div>
        
        {/* Robot arms */}
        <motion.div 
          className="absolute left-0 top-10 sm:top-12 w-3 sm:w-4 h-10 sm:h-12 bg-gray-200 rounded-full transform -translate-x-2 rotate-12"
          animate={{ rotate: [12, 5, 12] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute right-0 top-12 sm:top-14 w-3 sm:w-4 h-10 sm:h-12 bg-gray-200 rounded-full transform translate-x-2 -rotate-12"
          animate={{ rotate: [-12, -5, -12] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
      </div>
    </motion.div>
  );
};

export default Robot;
