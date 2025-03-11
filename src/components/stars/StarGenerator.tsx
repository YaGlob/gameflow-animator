
import { useEffect, useState } from 'react';

export interface Star {
  id: number;
  left: string;
  top: string;
  size: 'small' | 'medium' | 'large';
  duration: string;
  delay: string;
}

export interface ShootingStar {
  id: number;
  left: string;
  top: string;
  angle: string;
  duration: string;
  delay: string;
}

export interface Comet {
  id: number;
  left: string;
  top: string;
  delay: string;
}

interface UseStarGeneratorProps {
  starCount: number;
  shootingStarCount: number;
  cometCount: number;
}

export const useStarGenerator = ({
  starCount,
  shootingStarCount,
  cometCount
}: UseStarGeneratorProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);
  
  useEffect(() => {
    // Generate stars
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const sizeRandom = Math.random();
      let size: 'small' | 'medium' | 'large' = 'small';
      
      if (sizeRandom > 0.9) {
        size = 'large';
      } else if (sizeRandom > 0.6) {
        size = 'medium';
      }
      
      newStars.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        duration: `${2 + Math.random() * 6}s`,
        delay: `${Math.random() * 10}s`
      });
    }
    setStars(newStars);
    
    // Generate shooting stars
    const newShootingStars: ShootingStar[] = [];
    for (let i =.0; i < shootingStarCount; i++) {
      newShootingStars.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        angle: `${30 + Math.random() * 30}deg`,
        duration: `${10 + Math.random() * 20}s`,
        delay: `${Math.random() * 30}s`
      });
    }
    setShootingStars(newShootingStars);
    
    // Generate comets
    const newComets: Comet[] = [];
    for (let i = 0; i < cometCount; i++) {
      newComets.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 30}%`,
        delay: `${Math.random() * 40}s`
      });
    }
    setComets(newComets);
  }, [starCount, shootingStarCount, cometCount]);

  return { stars, shootingStars, comets };
};
