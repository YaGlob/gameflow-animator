
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RobotProps {
  className?: string;
  variant?: "normal" | "thinking" | "happy";
  onClick?: () => void;
}

const Robot: FC<RobotProps> = ({ className = "", variant = "normal", onClick }) => {
  const [currentVariant, setCurrentVariant] = useState(variant);
  
  // Cycle through expressions occasionally for more life-like behavior
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to change expression
      if (Math.random() < 0.2) {
        const expressions: ("normal" | "thinking" | "happy")[] = ["normal", "thinking", "happy"];
        const newVariant = expressions[Math.floor(Math.random() * expressions.length)];
        setCurrentVariant(newVariant);
        
        // Reset back to original variant after 3 seconds
        setTimeout(() => {
          setCurrentVariant(variant);
        }, 3000);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [variant]);
  
  // Get the appropriate robot image based on variant
  const getRobotImage = () => {
    switch (currentVariant) {
      case "thinking":
        return "/lovable-uploads/dab3d977-577e-4c65-bfba-057c5b478b32.png";
      case "happy":
        return "/lovable-uploads/020498bf-762c-4f12-b186-390b2a7c21f6.png";
      case "normal":
      default:
        return "/lovable-uploads/a1044efd-454f-470d-a486-4ea82a28e402.png";
    }
  };

  return (
    <motion.div 
      className={`relative z-50 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Robot image container */}
      <motion.div
        className="w-24 h-24 sm:w-32 sm:h-32"
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut" 
        }}
      >
        <motion.img 
          src={getRobotImage()}
          alt="Pixel the Robot"
          className="w-full h-full object-contain"
          animate={{ 
            rotateZ: [0, 2, 0, -2, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut" 
          }}
        />
      </motion.div>
      
      {/* Light effect behind the robot */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-blue-400/20 rounded-full blur-lg"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  );
};

export default Robot;
