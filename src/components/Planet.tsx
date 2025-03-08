
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PlanetProps {
  size: number;
  color: string;
  orbitRadius: number;
  orbitDuration: number;
  rotationDuration: number;
  orbitDelay?: number;
  children?: ReactNode;
  className?: string;
}

const Planet = ({
  size,
  color,
  orbitRadius,
  orbitDuration,
  rotationDuration,
  orbitDelay = 0,
  children,
  className = "",
}: PlanetProps) => {
  return (
    <motion.div
      className="absolute"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: orbitDuration,
        repeat: Infinity,
        ease: "linear",
        delay: orbitDelay,
      }}
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        top: -orbitRadius,
        right: -orbitRadius,
      }}
    >
      <motion.div
        className={`absolute rounded-full flex items-center justify-center ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          top: orbitRadius - size / 2,
          left: orbitRadius - size / 2,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Planet;
