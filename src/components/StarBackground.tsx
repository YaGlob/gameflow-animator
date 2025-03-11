
import '../styles/stars.css';
import Star from './stars/Star';
import ShootingStar from './stars/ShootingStar';
import Comet from './stars/Comet';
import Rocket from './stars/Rocket';
import Satellite from './stars/Satellite';
import UFO from './stars/UFO';
import GridBackground from './stars/GridBackground';
import { useStarGenerator } from './stars/StarGenerator';

interface StarBackgroundProps {
  starCount?: number;
  shootingStarCount?: number;
  cometCount?: number;
}

const StarBackground = ({
  starCount = 150,
  shootingStarCount = 5,
  cometCount = 2
}: StarBackgroundProps) => {
  const { stars, shootingStars, comets } = useStarGenerator({
    starCount,
    shootingStarCount,
    cometCount
  });

  return (
    <>
      {/* Stars container */}
      <div className="stars">
        {/* Render stars */}
        {stars.map((star) => (
          <Star key={`star-${star.id}`} {...star} />
        ))}
        
        {/* Render shooting stars */}
        {shootingStars.map((shootingStar) => (
          <ShootingStar key={`shooting-star-${shootingStar.id}`} {...shootingStar} />
        ))}
        
        {/* Render comets */}
        {comets.map((comet) => (
          <Comet key={`comet-${comet.id}`} {...comet} />
        ))}
        
        {/* Animated objects */}
        <Rocket />
        <Satellite />
        <UFO />
      </div>
      
      {/* Grid background */}
      <GridBackground />
    </>
  );
};

export default StarBackground;
