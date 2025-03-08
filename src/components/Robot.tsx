
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
      <div className="w-20 h-28 sm:w-28 sm:h-36 bg-gradient-to-b from-gray-200 to-gray-400 rounded-2xl flex flex-col items-center justify-center relative">
        {/* Robot head */}
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-xl shadow-md absolute -top-10 sm:-top-12 overflow-hidden border-2 border-gray-600"
          animate={{ 
            rotateZ: [0, 2, 0, -2, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut" 
          }}
        >
          {/* Robot eyes with animated expressions */}
          <div className="flex space-x-2 justify-center pt-4">
            <motion.div 
              className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full"
              animate={{ 
                scaleY: [1, 0.2, 1],
                opacity: [1, 0.7, 1] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full"
              animate={{ 
                scaleY: [1, 0.2, 1],
                opacity: [1, 0.7, 1] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                delay: 0.3,
                repeatType: "reverse" 
              }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className="w-8 h-2 sm:w-10 sm:h-2 bg-cyan-400 rounded-full mx-auto mt-3"
            animate={{ 
              width: ["30%", "40%", "30%"],
              height: ["10%", "15%", "10%"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              repeatType: "reverse" 
            }}
          />
          
          {/* Screen glare effect */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 to-transparent"
            animate={{ 
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
        
        {/* Robot body details - center glowing core */}
        <div className="absolute top-8 sm:top-6 left-0 right-0 flex justify-center">
          <motion.div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 10px rgba(59, 130, 246, 0.6)', 
                '0 0 20px rgba(59, 130, 246, 0.8)', 
                '0 0 10px rgba(59, 130, 246, 0.6)'
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 
            }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-200" />
          </motion.div>
        </div>
        
        {/* Robot arms */}
        <motion.div 
          className="absolute left-0 top-8 sm:top-8 w-3 sm:w-4 h-10 sm:h-14 bg-gray-300 rounded-full transform -translate-x-2 rotate-12"
          animate={{ rotate: [12, 5, 12] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute right-0 top-8 sm:top-8 w-3 sm:w-4 h-10 sm:h-14 bg-gray-300 rounded-full transform translate-x-2 -rotate-12"
          animate={{ rotate: [-12, -5, -12] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
        
        {/* Antenna */}
        <div className="absolute -top-14 sm:-top-16 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-400">
          <motion.div 
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 absolute -top-2 left-1/2 transform -translate-x-1/2"
            animate={{ 
              boxShadow: [
                '0 0 5px rgba(239, 68, 68, 0.5)', 
                '0 0 10px rgba(239, 68, 68, 0.8)', 
                '0 0 5px rgba(239, 68, 68, 0.5)'
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1 
            }}
          />
        </div>
        
        {/* Robot legs */}
        <div className="absolute -bottom-4 sm:-bottom-6 left-4 w-3 sm:w-4 h-5 sm:h-6 bg-gray-300 rounded-full"></div>
        <div className="absolute -bottom-4 sm:-bottom-6 right-4 w-3 sm:w-4 h-5 sm:h-6 bg-gray-300 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default Robot;
