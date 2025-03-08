
import { SplineScene } from "@/components/ui/spline";
import { motion } from "framer-motion";

interface RobotSceneProps {
  className?: string;
  variant?: "normal" | "thinking" | "happy";
}

const RobotScene = ({ className = "", variant = "normal" }: RobotSceneProps) => {
  // Determine which scene URL to use based on the variant
  const getSceneUrl = () => {
    // For now, we're using the same demo scene for all variants
    // In a real implementation, you might have different scene URLs for different variants
    return "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";
  };

  return (
    <motion.div 
      className={`relative z-50 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-36 h-36 sm:w-44 sm:h-44 relative">
        <SplineScene 
          scene={getSceneUrl()}
          className="w-full h-full filter brightness-200 saturate-0"
        />
      </div>
      
      {/* Light effect behind the robot */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-blue-400/20 rounded-full blur-lg"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  );
};

export default RobotScene;
