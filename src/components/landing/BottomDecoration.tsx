
import { motion } from "framer-motion";

const BottomDecoration = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-[calc(50%-80px)] overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-950/90 z-20 pointer-events-none" />
        
        <div className="w-full h-full">
          <img 
            src="/images/grid-background.png" 
            alt="Grid Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <motion.img 
          src="/images/education-robot.png" 
          alt="Education with Robot" 
          className="w-full object-contain"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>

      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex items-center space-x-2 z-40">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <div className="text-xs text-white/80">Mobile Ready</div>
      </div>
    </>
  );
};

export default BottomDecoration;
