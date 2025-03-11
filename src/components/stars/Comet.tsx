
/**
 * Props for the Comet component
 */
interface CometProps {
  id: number;      // Unique identifier for the comet
  left: string;    // Horizontal position (CSS value like "10%")
  top: string;     // Vertical position (CSS value like "20%")
  delay: string;   // Animation delay (CSS value like "0.5s")
}

/**
 * Comet Component
 * 
 * Renders a comet that appears in the star background.
 * Comets add visual interest to the space theme of the game.
 * Each comet has its own position and animation timing.
 * 
 * @param id - Unique identifier for the comet
 * @param left - Horizontal position as CSS value
 * @param top - Vertical position as CSS value
 * @param delay - Animation delay as CSS value
 */
const Comet = ({ id, left, top, delay }: CometProps) => {
  return (
    <div
      key={`comet-${id}`}
      className="comet"
      style={{
        left,               // Position from left edge
        top,                // Position from top edge
        animationDelay: delay // Delay before animation starts
      }}
    />
  );
};

export default Comet;
