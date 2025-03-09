
import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface RobotProps {
  className?: string;
  variant?: "normal" | "thinking" | "happy";
  onClick?: () => void;
  isSpeaking?: boolean;
}

// 3D Robot Model Component
const RobotModel: FC<{
  variant: "normal" | "thinking" | "happy";
  isSpeaking: boolean;
}> = ({ variant, isSpeaking }) => {
  const group = useRef<THREE.Group>(null);
  
  // Animation state
  const [animationIntensity, setAnimationIntensity] = useState(0);
  
  // Update animation intensity when speaking
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        // Random variation for speaking animation
        setAnimationIntensity(Math.random() * 0.5);
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      setAnimationIntensity(0);
    }
  }, [isSpeaking]);
  
  // Animation loop
  useEffect(() => {
    if (!group.current) return;
    
    const animate = () => {
      if (group.current) {
        // Basic floating animation
        group.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Add speaking animation when isSpeaking is true
        if (isSpeaking) {
          // Simulate speaking by subtle rotation variations
          group.current.rotation.z = Math.sin(Date.now() * 0.01) * animationIntensity * 0.1;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isSpeaking, animationIntensity]);
  
  // Different models based on variant
  const getModelPath = () => {
    switch (variant) {
      case "thinking":
        return "/lovable-uploads/dab3d977-577e-4c65-bfba-057c5b478b32.png";
      case "happy":
        return "/lovable-uploads/020498bf-762c-4f12-b186-390b2a7c21f6.png";
      case "normal":
      default:
        return "/lovable-uploads/a1044efd-454f-470d-a486-4ea82a28e402.png";
    }
  };
  
  return (
    <group ref={group}>
      {/* Create a plane geometry with the robot texture */}
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial transparent>
          <texture
            attach="map"
            url={getModelPath()}
            colorSpace={THREE.SRGBColorSpace}
            onUpdate={function() {
              // This function can be called with or without arguments
              // When called with a texture, update it
              const texture = arguments[0];
              if (texture && texture.needsUpdate !== undefined) {
                texture.needsUpdate = true;
              }
            }}
          />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};

const Robot: FC<RobotProps> = ({ 
  className = "", 
  variant = "normal", 
  onClick,
  isSpeaking = false 
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant);
  
  // Cycle through expressions occasionally for more life-like behavior
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to change expression
      if (Math.random() < 0.2) {
        const expressions: ("normal" | "thinking" | "happy")[] = ["normal", "thinking", "happy"];
        const newVariant = expressions[Math.floor(Math.random() * expressions.length)];
        setCurrentVariant(newVariant);
        
        // Reset back to original variant after 3 seconds
        setTimeout(() => {
          setCurrentVariant(variant);
        }, 3000);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [variant]);
  
  return (
    <motion.div 
      className={`relative z-50 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* 3D Robot container */}
      <motion.div
        className="w-24 h-24 sm:w-32 sm:h-32"
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut" 
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <RobotModel 
            variant={currentVariant} 
            isSpeaking={isSpeaking} 
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
          />
        </Canvas>
      </motion.div>
      
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

export default Robot;
