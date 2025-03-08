
import { FC } from "react";

interface RobotProps {
  className?: string;
}

const Robot: FC<RobotProps> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Robot body - more futuristic with rounded edges */}
      <div className="w-28 h-36 bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl flex flex-col items-center justify-center relative">
        {/* Robot head */}
        <div className="w-20 h-20 bg-white rounded-xl shadow-md absolute -top-12">
          {/* Robot eyes */}
          <div className="flex space-x-3 justify-center pt-5">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Robot antennas */}
          <div className="absolute -top-4 right-3 w-1.5 h-6 bg-gray-400 rounded-full">
            <div className="w-3 h-3 rounded-full bg-blue-400 absolute -top-2"></div>
          </div>
        </div>
        
        {/* Robot body details */}
        <div className="absolute top-12 left-0 right-0 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-200"></div>
          </div>
        </div>
        
        {/* Robot arms */}
        <div className="absolute left-0 top-14 w-6 h-16 bg-gray-200 rounded-full transform -translate-x-2 rotate-12"></div>
        <div className="absolute right-0 top-16 w-6 h-16 bg-gray-200 rounded-full transform translate-x-2 -rotate-12"></div>
      </div>
    </div>
  );
};

export default Robot;
