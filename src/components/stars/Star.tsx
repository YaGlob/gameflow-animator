
import { motion } from 'framer-motion';

/**
 * Props for the Star component
 */
interface StarProps {
  id: number;       // Unique identifier for the star
  left: string;     // Horizontal position (CSS value like "10%")
  top: string;      // Vertical position (CSS value like "20%")
  size: 'small' | 'medium' | 'large';  // Size category of the star
  duration: string; // Animation duration (CSS value like "3s")
  delay: string;    // Animation delay (CSS value like "0.5s")
}

/**
 * Star Component
 * 
 * Renders a single star in the star background.
 * Each star has its own position, size, and animation timing.
 * Stars twinkle at different rates to create a more natural effect.
 * 
 * @param id - Unique identifier for the star
 * @param left - Horizontal position as CSS value
 * @param top - Vertical position as CSS value
 * @param size - Size category (small, medium, or large)
 * @param duration - Animation duration as CSS value
 * @param delay - Animation delay as CSS value
 */
const Star = ({ id, left, top, size, duration, delay }: StarProps) => {
  return (
    <div
      key={`star-${id}`}
      className={`star ${size}`}
      style={{
        left,                  // Position from left edge
        top,                   // Position from top edge
        '--duration': duration, // CSS variable for animation duration
        animationDelay: delay   // Delay before animation starts
      } as React.CSSProperties}
    />
  );
};

export default Star;
