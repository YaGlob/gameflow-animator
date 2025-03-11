
import { motion } from 'framer-motion';

interface StarProps {
  id: number;
  left: string;
  top: string;
  size: 'small' | 'medium' | 'large';
  duration: string;
  delay: string;
}

const Star = ({ id, left, top, size, duration, delay }: StarProps) => {
  return (
    <div
      key={`star-${id}`}
      className={`star ${size}`}
      style={{
        left,
        top,
        '--duration': duration,
        animationDelay: delay
      } as React.CSSProperties}
    />
  );
};

export default Star;
