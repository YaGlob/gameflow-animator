
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to landing page after a delay
    const timer = setTimeout(() => {
      navigate('/landing');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with space theme */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ 
          backgroundImage: "url('/images/game-background.png')", 
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Loading text with animation */}
      <motion.div 
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <h1 className="text-4xl font-bold text-white">Preparing your adventure...</h1>
          <p className="text-xl text-blue-200 mt-2">Get ready to explore and learn!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
