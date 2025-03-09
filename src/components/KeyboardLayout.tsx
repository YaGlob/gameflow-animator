
import { motion } from "framer-motion";

interface KeyboardLayoutProps {
  onKeyPress: (key: string) => void;
}

const KeyboardLayout = ({ onKeyPress }: KeyboardLayoutProps) => {
  // Define keyboard layout
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
        staggerChildren: 0.03,
      },
    },
  };
  
  const keyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 10px rgba(79, 209, 255, 0.8)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px rgba(79, 209, 255, 0.5)",
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={`row-${rowIndex}`}
          className="flex justify-center gap-2 mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {row.map((key) => (
            <motion.button
              key={key}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border border-white/30 text-white text-2xl font-bold backdrop-blur-sm bg-[#1e3e4a]"
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
