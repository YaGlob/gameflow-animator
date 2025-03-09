
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

const LottieAstronaut = () => {
  return (
    <motion.div 
      className="absolute top-[136px] left-4 md:top-[192px] md:left-20 w-32 h-32 md:w-48 md:h-48"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* We use scaleX(-1) to flip/rotate the animation to the opposite direction */}
      <div className="transform scale-x-[-1] origin-center">
        <DotLottieReact
          src="https://lottie.host/080858bf-b3b2-493f-bbe4-1761323fd0f5/uLl955WaXt.lottie"
          loop
          autoplay
        />
      </div>
    </motion.div>
  );
};

export default LottieAstronaut;
