
import { FC } from "react";

interface RobotProps {
  className?: string;
}

const Robot: FC<RobotProps> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
        <div className="relative">
          {/* Robot eyes */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
          </div>
          
          {/* Robot mouth */}
          <div className="mt-2 w-6 h-1 bg-gray-200 mx-auto"></div>
          
          {/* Robot antenna */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-300">
            <div className="w-2 h-2 rounded-full bg-red-400 absolute -top-1 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Robot body */}
      <div className="w-12 h-6 bg-indigo-700 mx-auto -mt-1 rounded-b-lg"></div>
    </div>
  );
};

export default Robot;
