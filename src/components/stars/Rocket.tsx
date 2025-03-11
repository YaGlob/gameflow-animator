
import { motion } from 'framer-motion';

const Rocket = () => {
  return (
    <motion.div 
      className="rocket"
      initial={{ x: -100, y: '100vh', rotate: -30 }}
      animate={{ x: 'calc(100vw + 100px)', y: -100, rotate: -30 }}
      transition={{ 
        duration: 15,
        repeat: Infinity,
        repeatDelay: 10,
        ease: "linear"
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.5C12 2.5 5.5 3.5 3 12C3 12 10 11 12 14C14 11 21 12 21 12C18.5 3.5 12 2.5 12 2.5Z" fill="#FF4B4B"/>
        <path d="M12 2.5C12 2.5 13.5 7 15 10C15 10 12 11 12 14C12 11 9 10 9 10C10.5 7 12 2.5 12 2.5Z" fill="#FF8C8C"/>
        <path d="M7 14C7 14 2 16 3 21C3 21 6 19.5 8 19.5C8 17.5 7 14 7 14Z" fill="#FF4B4B"/>
        <path d="M17 14C17 14 22 16 21 21C21 21 18 19.5 16 19.5C16 17.5 17 14 17 14Z" fill="#FF4B4B"/>
        <path d="M12 14C12 14 11 17 12 22C13 17 12 14 12 14Z" fill="#FF8C8C"/>
        <path d="M12 14C12 14 13 17 12 22" stroke="#FF4B4B" strokeWidth="0.5"/>
        <path d="M12 14C12 14 11 17 12 22" stroke="#FF4B4B" strokeWidth="0.5"/>
      </svg>
    </motion.div>
  );
};

export default Rocket;
