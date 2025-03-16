
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  delay?: number;
  position?: "top-right" | "bottom-left" | "bottom-right";
}

const SpeechBubble: FC<SpeechBubbleProps> = ({
  text,
  delay = 0,
  position = "bottom-right"
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  const getBubbleStyles = () => {
    switch (position) {
      case "bottom-left":
        return {
          containerClass: "relative max-w-xs",
          bubbleClass: "bg-white p-3 rounded-xl shadow-lg relative",
          tailClass: "absolute w-3 h-3 bg-white transform rotate-45 -right-1 top-1/2 -translate-y-1/2" // Points to the right (toward robot)
        };
      case "bottom-right":
        return {
          containerClass: "relative max-w-xs",
          bubbleClass: "bg-white p-3 rounded-xl shadow-lg relative",
          tailClass: "absolute w-3 h-3 bg-white transform rotate-45 -right-1 top-1/2 -translate-y-1/2" // Points to the right (toward robot)
        };
      case "top-right":
      default:
        return {
          containerClass: "relative max-w-xs",
          bubbleClass: "bg-white p-3 rounded-xl shadow-lg relative",
          tailClass: "absolute w-3 h-3 bg-white transform rotate-45 -right-1 top-1/2 -translate-y-1/2" // Points to the right (toward robot)
        };
    }
  };

  const bubbleStyles = getBubbleStyles();

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
      <div className={bubbleStyles.bubbleClass}>
        <p className="text-black text-sm font-verdana text-center">
          {displayText}
        </p>
        
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
        
        <div className={bubbleStyles.tailClass}></div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
