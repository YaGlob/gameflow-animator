
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  delay?: number;
  position?: "top-right" | "bottom-left" | "left";
}

const SpeechBubble: FC<SpeechBubbleProps> = ({
  text,
  delay = 0,
  position = "top-right"
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Reset and restart animation when text changes
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  // Determine bubble tail direction and styling based on position
  const bubbleStyles = position === "bottom-left" 
    ? {
        containerClass: "relative max-w-xs",
        tailClass: "absolute w-3 h-3 bg-white transform rotate-45 left-0 top-1/2 -translate-x-1/2" // Left pointing tail
      }
    : position === "left"
    ? {
        containerClass: "relative max-w-xs absolute -left-64 top-1/2 -translate-y-1/2",
        tailClass: "absolute w-3 h-3 bg-white transform rotate-45 right-0 top-1/2 translate-x-1/2" // Right pointing tail (appears on left side)
      }
    : {
        containerClass: "relative max-w-xs",
        tailClass: "absolute w-3 h-3 bg-white transform rotate-45 right-0 top-1/2 translate-x-1/2" // Right pointing tail
      };

  return (
    <motion.div 
      className={bubbleStyles.containerClass}
      initial={{
        opacity: 0,
        scale: 0.8
      }} 
      animate={{
        opacity: 1,
        scale: 1
      }} 
      transition={{
        duration: 0.5,
        delay
      }}
    >
      <div className="bg-white p-3 rounded-xl shadow-lg relative">
        <p className="text-black text-sm font-verdana text-center">
          {displayText}
        </p>
        
        {/* Blue outline effect */}
        <motion.div 
          className="absolute inset-0 -z-10 rounded-xl" 
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }} 
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }} 
        />
        
        {/* Speech bubble tail - direction depends on position prop */}
        <div className={bubbleStyles.tailClass}></div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
