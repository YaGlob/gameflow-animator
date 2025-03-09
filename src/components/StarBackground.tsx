import { useState, useEffect } from 'react';
import '../styles/stars.css';
import { motion } from 'framer-motion';

interface StarBackgroundProps {
  starCount?: number;
  shootingStarCount?: number;
  cometCount?: number;
}

interface Star {
  id: number;
  left: string;
  top: string;
  size: 'small' | 'medium' | 'large';
  duration: string;
  delay: string;
}

interface ShootingStar {
  id: number;
  left: string;
  top: string;
  angle: string;
  duration: string;
  delay: string;
}

interface Comet {
  id: number;
  left: string;
  top: string;
  delay: string;
}

const StarBackground = ({
  starCount = 150,
  shootingStarCount = 5,
  cometCount = 2
}: StarBackgroundProps) => {
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
    for (let i = 0; i < shootingStarCount; i++) {
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

  return (
    <>
      {/* Stars container */}
      <div className="stars">
        {/* Render stars */}
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className={`star ${star.size}`}
            style={{
              left: star.left,
              top: star.top,
              '--duration': star.duration,
              animationDelay: star.delay
            } as React.CSSProperties}
          />
        ))}
        
        {/* Render shooting stars */}
        {shootingStars.map((shootingStar) => (
          <div
            key={`shooting-star-${shootingStar.id}`}
            className="shooting-star"
            style={{
              left: shootingStar.left,
              top: shootingStar.top,
              '--angle': shootingStar.angle,
              '--duration': shootingStar.duration,
              animationDelay: shootingStar.delay
            } as React.CSSProperties}
          />
        ))}
        
        {/* Render comets */}
        {comets.map((comet) => (
          <div
            key={`comet-${comet.id}`}
            className="comet"
            style={{
              left: comet.left,
              top: comet.top,
              animationDelay: comet.delay
            }}
          />
        ))}
        
        {/* Rocket */}
        <motion.div 
          className="rocket"
          initial={{ x: -100, y: '100vh', rotate: -30 }}
          animate={{ x: 'calc(100vw + 100px)', y: -100, rotate: -30 }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatDelay: 10,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.5C12 2.5 5.5 3.5 3 12C3 12 10 11 12 14C14 11 21 12 21 12C18.5 3.5 12 2.5 12 2.5Z" fill="#FF4B4B"/>
            <path d="M12 2.5C12 2.5 13.5 7 15 10C15 10 12 11 12 14C12 11 9 10 9 10C10.5 7 12 2.5 12 2.5Z" fill="#FF8C8C"/>
            <path d="M7 14C7 14 2 16 3 21C3 21 6 19.5 8 19.5C8 17.5 7 14 7 14Z" fill="#FF4B4B"/>
            <path d="M17 14C17 14 22 16 21 21C21 21 18 19.5 16 19.5C16 17.5 17 14 17 14Z" fill="#FF4B4B"/>
            <path d="M12 14C12 14 11 17 12 22C13 17 12 14 12 14Z" fill="#FF8C8C"/>
            <path d="M12 14C12 14 13 17 12 22" stroke="#FF4B4B" strokeWidth="0.5"/>
            <path d="M12 14C12 14 11 17 12 22" stroke="#FF4B4B" strokeWidth="0.5"/>
          </svg>
        </motion.div>
        
        {/* Animated Satellite */}
        <motion.div
          className="absolute w-12 h-12 z-10"
          initial={{ x: -50, y: '30vh' }}
          animate={{ 
            x: 'calc(100vw + 50px)',
            y: ['30vh', '25vh', '35vh', '30vh'],
          }}
          transition={{ 
            x: { duration: 40, repeat: Infinity, ease: "linear" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="2" width="6" height="12" rx="1" fill="#64B5F6" />
            <rect x="7" y="14" width="10" height="6" rx="1" fill="#1E88E5" />
            <rect x="2" y="8" width="20" height="6" rx="1" fill="#42A5F5" />
            <circle cx="12" cy="11" r="2" fill="#FFC107" />
            <rect x="4" y="6" width="16" height="2" rx="1" fill="#90CAF9" />
            <rect x="4" y="14" width="16" height="2" rx="1" fill="#90CAF9" />
          </svg>
        </motion.div>
        
        {/* Animated UFO */}
        <motion.div
          className="absolute w-16 h-8 z-10"
          initial={{ x: 'calc(100vw + 50px)', y: '15vh' }}
          animate={{ 
            x: -100,
            y: ['15vh', '20vh', '10vh', '15vh'],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            x: { duration: 30, repeat: Infinity, ease: "linear", repeatDelay: 15 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="6" rx="10" ry="4" fill="#9C27B0" />
            <ellipse cx="12" cy="6" rx="6" ry="2" fill="#E1BEE7" />
            <circle cx="12" cy="6" r="1" fill="#4A148C" />
            <rect x="11" y="2" width="2" height="1" rx="0.5" fill="#4A148C" />
            <rect x="9" y="10" width="2" height="1" rx="0.5" fill="#4A148C" />
            <rect x="13" y="10" width="2" height="1" rx="0.5" fill="#4A148C" />
            <circle cx="12" cy="6" r="5" stroke="#CE93D8" strokeWidth="0.5" strokeDasharray="1 1" />
          </svg>
        </motion.div>
      </div>
      
      {/* Grid background */}
      <div className="grid-bg">
        <div className="grid"></div>
      </div>
    </>
  );
};

export default StarBackground; 