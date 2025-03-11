
import { motion } from 'framer-motion';

/**
 * Props for the ShootingStar component
 */
interface ShootingStarProps {
  id: number;       // Unique identifier for the shooting star
  left: string;     // Horizontal position (CSS value like "10%")
  top: string;      // Vertical position (CSS value like "20%")
  angle: string;    // Angle of travel (CSS value like "30deg")
  duration: string; // Animation duration (CSS value like "15s")
  delay: string;    // Animation delay (CSS value like "5s")
}

/**
 * ShootingStar Component
 * 
 * Renders a shooting star that animates across the star background.
 * Each shooting star has its own position, angle, and animation timing.
 * This adds dynamic visual interest to the space theme of the game.
 * 
 * @param id - Unique identifier for the shooting star
 * @param left - Horizontal starting position as CSS value
 * @param top - Vertical starting position as CSS value
 * @param angle - Angle of travel as CSS value
 * @param duration - Animation duration as CSS value
 * @param delay - Animation delay as CSS value
 */
const ShootingStar = ({ id, left, top, angle, duration, delay }: ShootingStarProps) => {
  return (
    <div
      key={`shooting-star-${id}`}
      className="shooting-star"
      style={{
        left,                 // Position from left edge
        top,                  // Position from top edge
        '--angle': angle,     // CSS variable for travel angle
        '--duration': duration, // CSS variable for animation duration
        animationDelay: delay  // Delay before animation starts
      } as React.CSSProperties}
    />
  );
};

export default ShootingStar;
