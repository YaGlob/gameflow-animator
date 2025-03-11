
import { useEffect, useState } from 'react';

/**
 * Interface for a star object
 */
export interface Star {
  id: number;                          // Unique identifier
  left: string;                        // Horizontal position (CSS value)
  top: string;                         // Vertical position (CSS value)
  size: 'small' | 'medium' | 'large';  // Size category
  duration: string;                    // Animation duration (CSS value)
  delay: string;                       // Animation delay (CSS value)
}

/**
 * Interface for a shooting star object
 */
export interface ShootingStar {
  id: number;      // Unique identifier
  left: string;    // Horizontal position (CSS value)
  top: string;     // Vertical position (CSS value)
  angle: string;   // Angle of travel (CSS value)
  duration: string; // Animation duration (CSS value)
  delay: string;   // Animation delay (CSS value)
}

/**
 * Interface for a comet object
 */
export interface Comet {
  id: number;      // Unique identifier
  left: string;    // Horizontal position (CSS value)
  top: string;     // Vertical position (CSS value)
  delay: string;   // Animation delay (CSS value)
}

/**
 * Props for the useStarGenerator hook
 */
interface UseStarGeneratorProps {
  starCount: number;          // Number of regular stars to generate
  shootingStarCount: number;  // Number of shooting stars to generate
  cometCount: number;         // Number of comets to generate
}

/**
 * useStarGenerator Hook
 * 
 * Custom hook that generates arrays of star, shooting star, and comet objects
 * with random positions and timing. These are used to create the animated
 * space background for the game.
 * 
 * @param starCount - Number of regular stars to generate
 * @param shootingStarCount - Number of shooting stars to generate
 * @param cometCount - Number of comets to generate
 * @returns Object containing arrays of stars, shooting stars, and comets
 */
export const useStarGenerator = ({
  starCount,
  shootingStarCount,
  cometCount
}: UseStarGeneratorProps) => {
  // State to store the generated objects
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);
  
  // Generate all objects when component mounts or counts change
  useEffect(() => {
    // Generate stars with random properties
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const sizeRandom = Math.random();
      let size: 'small' | 'medium' | 'large' = 'small';
      
      // Determine star size based on random value
      if (sizeRandom > 0.9) {
        size = 'large';  // 10% of stars are large
      } else if (sizeRandom > 0.6) {
        size = 'medium'; // 30% of stars are medium
      }
      // Remaining 60% are small
      
      // Create star with random position, size, and timing
      newStars.push({
        id: i,
        left: `${Math.random() * 100}%`,         // Random horizontal position
        top: `${Math.random() * 100}%`,          // Random vertical position
        size,                                    // Size category
        duration: `${2 + Math.random() * 6}s`,   // Random duration between 2-8 seconds
        delay: `${Math.random() * 10}s`          // Random delay between 0-10 seconds
      });
    }
    setStars(newStars);
    
    // Generate shooting stars with random properties
    const newShootingStars: ShootingStar[] = [];
    for (let i =.0; i < shootingStarCount; i++) {
      newShootingStars.push({
        id: i,
        left: `${Math.random() * 100}%`,          // Random horizontal position
        top: `${Math.random() * 50}%`,            // Random vertical position in top half
        angle: `${30 + Math.random() * 30}deg`,   // Random angle between 30-60 degrees
        duration: `${10 + Math.random() * 20}s`,  // Random duration between 10-30 seconds
        delay: `${Math.random() * 30}s`           // Random delay between 0-30 seconds
      });
    }
    setShootingStars(newShootingStars);
    
    // Generate comets with random properties
    const newComets: Comet[] = [];
    for (let i = 0; i < cometCount; i++) {
      newComets.push({
        id: i,
        left: `${Math.random() * 100}%`,         // Random horizontal position
        top: `${Math.random() * 30}%`,           // Random vertical position in top 30%
        delay: `${Math.random() * 40}s`          // Random delay between 0-40 seconds
      });
    }
    setComets(newComets);
  }, [starCount, shootingStarCount, cometCount]);

  // Return the generated objects
  return { stars, shootingStars, comets };
};
