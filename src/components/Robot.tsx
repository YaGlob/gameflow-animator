
import { ReactNode } from "react";

interface RobotProps {
  className?: string;
}

const Robot = ({ className = "" }: RobotProps) => {
  return (
    <div className={`relative ${className} animate-float`} style={{animationDelay: "0.5s"}}>
      <img 
        src="/lovable-uploads/3ee9c561-bda2-45b6-aae3-60098360b85a.png" 
        alt="Robot Assistant" 
        className="h-24 w-auto"
      />
    </div>
  );
};

export default Robot;
