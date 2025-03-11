
import { motion } from 'framer-motion';

const UFO = () => {
  return (
    <motion.div
      className="absolute w-16 h-8 z-10"
      initial={{ x: 'calc(100vw + 50px)', y: '15vh' }}
      animate={{ 
        x: -100,
        y: ['15vh', '20vh', '10vh', '15vh'],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        x: { duration: 30, repeat: Infinity, ease: "linear", repeatDelay: 15 },
        y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="6" rx="10" ry="4" fill="#9C27B0" />
        <ellipse cx="12" cy="6" rx="6" ry="2" fill="#E1BEE7" />
        <circle cx="12" cy="6" r="1" fill="#4A148C" />
        <rect x="11" y="2" width="2" height="1" rx="0.5" fill="#4A148C" />
        <rect x="9" y="10" width="2" height="1" rx="0.5" fill="#4A148C" />
        <rect x="13" y="10" width="2" height="1" rx="0.5" fill="#4A148C" />
        <circle cx="12" cy="6" r="5" stroke="#CE93D8" strokeWidth="0.5" strokeDasharray="1 1" />
      </svg>
    </motion.div>
  );
};

export default UFO;
