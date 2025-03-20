
import { motion } from "framer-motion";

const CornerDecorations = () => {
  return (
    <>
      <div className="absolute -left-10 top-0 z-30 w-32 h-32 md:w-48 md:h-48">
        <motion.img 
          src="/images/corner-decoration-1.png"
          alt="Abstract line art"
          className="w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 w-32 h-32 md:w-48 md:h-48">
        <motion.img 
          src="/images/planets-decoration.png"
          alt="Saturn and Neptune planets"
          className="w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </>
  );
};

export default CornerDecorations;
