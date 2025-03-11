
import { motion } from "framer-motion";

/**
 * Props for the KeyboardLayout component
 */
interface KeyboardLayoutProps {
  onKeyPress: (key: string) => void;  // Function to call when a key is pressed
}

/**
 * KeyboardLayout Component
 * 
 * Creates a virtual keyboard for typing activities in the game.
 * The keyboard has letters arranged in 3 rows, with animated keys
 * that respond to user interaction with visual feedback.
 * 
 * @param onKeyPress - Function to call when a key is pressed
 */
const KeyboardLayout = ({ onKeyPress }: KeyboardLayoutProps) => {
  // Define keyboard layout - letters arranged in 3 rows
  const rows = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
    ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.'],
  ];
  
  // Animation variants for keyboard
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,  // Makes keys appear one after another
      },
    },
  };
  
  const keyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",         // Springy animation
        stiffness: 300,         // More responsive spring
        damping: 15,            // Less bouncy
      },
    },
    hover: {
      scale: 1.1,               // Grow when hovered
      boxShadow: "0 0 10px rgba(79, 209, 255, 0.8)",  // Glow effect
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,              // Shrink when pressed
      boxShadow: "0 0 5px rgba(79, 209, 255, 0.5)",   // Reduced glow
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Map through each row of keys */}
      {rows.map((row, rowIndex) => (
        <motion.div
          key={`row-${rowIndex}`}
          className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Map through each key in the current row */}
          {row.map((key) => (
            <motion.button
              key={key}
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border border-white/30 text-white text-lg sm:text-xl md:text-2xl font-bold backdrop-blur-sm bg-[#1e3e4a]"
              onClick={() => onKeyPress(key)}
              variants={keyVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {key}
            </motion.button>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default KeyboardLayout;
