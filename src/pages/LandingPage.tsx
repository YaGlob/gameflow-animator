
import { useNavigate } from "react-router-dom";
import GameLayout from "@/components/GameLayout";
import Robot from "@/components/Robot";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      
      // Calculate the relative position of the mouse in the window
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      // Apply a subtle parallax tilt effect to the grid
      gridRef.current.style.transform = `rotateX(${60 + y * 5}deg) rotateY(${x * 5}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Grid floor effect with enhanced 3D perspective */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 perspective-[1000px]">
        <div 
          ref={gridRef}
          className="w-full h-full bg-[linear-gradient(to_right,rgba(0,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.4)_1px,transparent_1px)]" 
          style={{ 
            backgroundSize: "60px 60px",
            transform: "rotateX(60deg)",
            transformOrigin: "bottom",
            animation: "gridPulse 8s infinite linear",
          }}
        >
          {/* Add distant vanishing lines for more depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(8,23,60,0.8)_100%)]"></div>
          
          {/* Animated glowing horizontal lines */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute h-px w-full bg-cyan-400 opacity-70"
              style={{
                bottom: `${i * 15}%`,
                animation: `gridLineFlow ${6 + i}s infinite linear`,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5)'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Add CSS animation keyframes in a style tag */}
      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { 
            background-color: rgba(0, 20, 40, 0.1);
          }
          50% { 
            background-color: rgba(0, 30, 60, 0.2);
          }
        }
        
        @keyframes gridLineFlow {
          0% {
            transform: translateZ(0) scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateZ(400px) scaleX(2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-star-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          ></div>
        ))}
      </div>

      {/* Glowing star in top left */}
      <div className="absolute top-24 left-48">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50"></div>
          <div className="absolute inset-2 bg-white rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-px bg-white transform rotate-45"></div>
            <div className="w-10 h-px bg-white transform -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Planets in top right */}
      <div className="absolute top-10 right-10">
        <div className="relative w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center animate-float" style={{animationDelay: "1.5s"}}>
          <div className="absolute w-full h-full rounded-full border-4 border-yellow-500 opacity-30"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 absolute top-2 right-3"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500 absolute bottom-4 left-3"></div>
          <div className="absolute -top-1 -left-1 w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-transparent opacity-40"></div>
        </div>
      </div>
      
      <div className="absolute top-32 right-32">
        <div className="relative w-24 h-24 rounded-full bg-blue-400 animate-float" style={{animationDelay: "0.7s"}}>
          <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-300 to-transparent opacity-60"></div>
          <div className="flex justify-center pt-6 space-x-6">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <div className="w-3 h-3 rounded-full bg-black"></div>
          </div>
          <div className="mx-auto mt-2 w-6 h-2 rounded-full bg-blue-600"></div>
        </div>
      </div>

      {/* Floating silhouettes on left */}
      <div className="absolute bottom-32 left-16">
        <div className="relative">
          <div className="absolute bottom-0 w-24 h-1 bg-cyan-400 rounded-full blur-sm opacity-70 animate-pulse"></div>
          <div className="flex items-end">
            <div className="h-16 w-6 bg-black rounded-t-md"></div>
            <div className="h-12 w-4 bg-black rounded-t-md ml-2"></div>
          </div>
        </div>
      </div>

      {/* Floating letters */}
      <div className="absolute bottom-56 left-12">
        <div className="flex space-x-2">
          {['w', 'j', 'o', 'E', 'b'].map((letter, index) => (
            <div 
              key={index}
              className="text-2xl font-bold" 
              style={{
                color: index % 2 === 0 ? '#FF6B6B' : '#4ECDC4',
                transform: `translateY(${Math.sin(index) * 10}px)`,
                textShadow: '0 0 10px rgba(255,255,255,0.7)'
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Astronaut on rocket */}
      <div className="absolute bottom-56 left-48">
        <div className="relative w-16 h-24 animate-float" style={{animationDelay: "1.2s"}}>
          <div className="absolute bottom-0 w-16 h-12 bg-gradient-to-b from-red-500 to-red-700 rounded-b-lg">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-orange-500 rounded-t-full">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-yellow-500 rounded-t-full">
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-5 bg-red-500 rounded-t-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full">
            <div className="absolute top-2 left-2 w-6 h-6 bg-blue-300 rounded-full opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Rocket on right */}
      <div className="absolute top-1/3 right-24 animate-float" style={{animationDelay: "0.5s"}}>
        <div className="relative w-12 h-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-200 rounded-t-full"></div>
          <div className="absolute top-5 left-0 right-0 h-12 bg-white rounded-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-6 bg-red-500 rounded-b-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-6 bg-red-500 rounded-b-lg"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-red-600 rounded"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-orange-500 rounded-b-lg">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-yellow-400 rounded-b-lg"></div>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        {/* Curved neon title */}
        <div className="mb-24 relative">
          {/* Arc path for text - this is invisible but used for the text path */}
          <svg className="absolute" width="480" height="150" viewBox="0 0 480 150" style={{ overflow: 'visible' }}>
            <defs>
              <path id="textArc" d="M 20,100 Q 240,30 460,100" fill="none" />
            </defs>
            
            {/* Glow effects behind the text */}
            <text>
              <textPath href="#textArc" textAnchor="middle" startOffset="50%">
                <tspan className="text-[45px] font-bold tracking-wider fill-blue-200 filter blur-lg opacity-70">
                  Letter Venture
                </tspan>
              </textPath>
            </text>
          </svg>
          
          {/* Actual text that follows the path */}
          <svg width="480" height="150" viewBox="0 0 480 150" style={{ overflow: 'visible' }}>
            <text>
              <textPath href="#textArc" textAnchor="middle" startOffset="50%">
                <tspan className="text-[45px] font-bold tracking-wider fill-white animate-pulse-glow">
                  Letter Venture
                </tspan>
              </textPath>
            </text>
          </svg>
          
          {/* Neon animation effects */}
          <div className="absolute inset-0 w-full h-full opacity-60">
            <div className="absolute inset-0 bg-blue-500 blur-xl animate-pulse-glow opacity-20"></div>
            <div className="absolute inset-0 bg-cyan-400 blur-lg animate-pulse-glow opacity-20" style={{animationDelay: "0.5s"}}></div>
          </div>
        </div>

        {/* Play button */}
        <button 
          onClick={() => navigate("/game")}
          className="relative bg-blue-400 hover:bg-blue-500 text-white rounded-full w-28 h-28 flex items-center justify-center transition-all hover:scale-105 focus:outline-none"
          aria-label="Play game"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-70"></div>
          
          {/* Button content */}
          <div className="relative bg-blue-400 hover:bg-blue-500 rounded-full w-28 h-28 flex items-center justify-center z-10">
            <Play size={50} fill="white" className="ml-3" />
          </div>
        </button>
      </div>
      
      {/* Robot character in bottom right */}
      <div className="absolute bottom-5 right-10 z-50 transform scale-90">
        <Robot />
      </div>
    </div>
  );
};

export default LandingPage;
