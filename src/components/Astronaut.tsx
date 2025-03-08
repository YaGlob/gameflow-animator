
import { ReactNode } from "react";

interface AstronautProps {
  className?: string;
  withRocket?: boolean;
}

const Astronaut = ({ className = "", withRocket = true }: AstronautProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="animate-float">
        <img 
          src="/lovable-uploads/0ade34bc-b498-4308-9c46-c521d27b4c23.png" 
          alt="Astronaut" 
          className="h-24 w-auto"
        />
      </div>
    </div>
  );
};

export default Astronaut;
