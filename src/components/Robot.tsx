
import { FC } from "react";

interface RobotProps {
  className?: string;
}

const Robot: FC<RobotProps> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Robot body - more futuristic with rounded edges */}
      <div className="w-24 h-32 sm:w-28 sm:h-36 bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl flex flex-col items-center justify-center relative">
        {/* Robot head */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-md absolute -top-10 sm:-top-12">
          {/* Robot eyes */}
          <div className="flex space-x-2 sm:space-x-3 justify-center pt-4 sm:pt-5">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Robot antennas */}
          <div className="absolute -top-3 sm:-top-4 right-2 sm:right-3 w-1 sm:w-1.5 h-4 sm:h-6 bg-gray-400 rounded-full">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 absolute -top-1.5 sm:-top-2"></div>
          </div>
        </div>
        
        {/* Robot body details */}
        <div className="absolute top-10 sm:top-12 left-0 right-0 flex justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-200"></div>
          </div>
        </div>
        
        {/* Robot arms */}
        <div className="absolute left-0 top-12 sm:top-14 w-4 sm:w-6 h-14 sm:h-16 bg-gray-200 rounded-full transform -translate-x-2 rotate-12"></div>
        <div className="absolute right-0 top-14 sm:top-16 w-4 sm:w-6 h-14 sm:h-16 bg-gray-200 rounded-full transform translate-x-2 -rotate-12"></div>
      </div>
    </div>
  );
};

export default Robot;
