
import { motion } from 'framer-motion';

interface ShootingStarProps {
  id: number;
  left: string;
  top: string;
  angle: string;
  duration: string;
  delay: string;
}

const ShootingStar = ({ id, left, top, angle, duration, delay }: ShootingStarProps) => {
  return (
    <div
      key={`shooting-star-${id}`}
      className="shooting-star"
      style={{
        left,
        top,
        '--angle': angle,
        '--duration': duration,
        animationDelay: delay
      } as React.CSSProperties}
    />
  );
};

export default ShootingStar;
