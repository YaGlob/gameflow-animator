
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PlayButton = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    console.log("Play button clicked, navigating to /game");
    navigate("/game");
  };

  return (
    <motion.button 
      onClick={handlePlayClick}
      className="absolute left-[calc(50%-65px)] top-[calc(50%+20px)] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-all hover:scale-105 focus:outline-none z-40"
      aria-label="Play game"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: "0 0 25px rgba(79, 209, 255, 0.8)",
        rotate: 5
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-80 animate-pulse"></div>
      
      <div className="relative bg-blue-500 hover:bg-blue-600 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center z-10">
        <Play size={30} fill="white" className="ml-2 md:size-[50px]" />
      </div>
    </motion.button>
  );
};

export default PlayButton;
