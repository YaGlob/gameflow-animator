
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

interface RobotProps {
  className?: string;
}

// Simple robot model component
function RobotModel({ ...props }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Animate the robot
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Robot body */}
      <mesh ref={meshRef} {...props}>
        <capsuleGeometry args={[0.5, 0.8, 4, 16]} />
        <meshStandardMaterial color="#9b87f5" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Robot head */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshStandardMaterial color="#403E43" metalness={0.8} roughness={0.1} />
        
        {/* Robot eyes */}
        <mesh position={[0.15, 0, 0.31]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#33C3F0" emissive="#33C3F0" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.15, 0, 0.31]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#33C3F0" emissive="#33C3F0" emissiveIntensity={0.5} />
        </mesh>
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial color="#8E9196" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial color="#8E9196" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Chest light */}
      <mesh position={[0, 0.1, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#0FA0CE" emissive="#0FA0CE" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

const Robot = ({ className = "" }: RobotProps) => {
  const [mounted, setMounted] = useState(false);

  // Use useEffect to handle mounting state for SSR compatibility
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the canvas until client-side
  if (!mounted) return null;

  return (
    <div className={`w-32 h-32 ${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={0} floatIntensity={1}>
          <RobotModel />
        </Float>
      </Canvas>
    </div>
  );
};

export default Robot;
