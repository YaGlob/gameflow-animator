
import { motion } from 'framer-motion';

/**
 * Satellite Component
 * 
 * Creates an animated satellite that moves across the screen.
 * The satellite follows a horizontal path with slight vertical movement
 * to create a more natural orbital motion.
 * This adds to the space theme of the educational game.
 */
const Satellite = () => {
  return (
    <motion.div
      className="absolute w-12 h-12 z-10"
      // Starting position - off screen to the left
      initial={{ x: -50, y: '30vh' }}
      // Animation path - moves horizontally across screen with slight vertical movement
      animate={{ 
        x: 'calc(100vw + 50px)',  // Move all the way past right edge
        y: ['30vh', '25vh', '35vh', '30vh'],  // Move slightly up and down
      }}
      // Animation timing
      transition={{ 
        x: { duration: 40, repeat: Infinity, ease: "linear" },  // Horizontal movement
        y: { duration: 10, repeat: Infinity, ease: "easeInOut" }  // Vertical movement
      }}
    >
      {/* SVG drawing of the satellite */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="2" width="6" height="12" rx="1" fill="#64B5F6" />
        <rect x="7" y="14" width="10" height="6" rx="1" fill="#1E88E5" />
        <rect x="2" y="8" width="20" height="6" rx="1" fill="#42A5F5" />
        <circle cx="12" cy="11" r="2" fill="#FFC107" />
        <rect x="4" y="6" width="16" height="2" rx="1" fill="#90CAF9" />
        <rect x="4" y="14" width="16" height="2" rx="1" fill="#90CAF9" />
      </svg>
    </motion.div>
  );
};

export default Satellite;
