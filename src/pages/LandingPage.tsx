
import { useNavigate } from "react-router-dom";
import GameLayout from "@/components/GameLayout";
import Robot from "@/components/Robot";
import { Play } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <GameLayout backTo="/">
      <div className="flex flex-col items-center justify-center h-screen w-full max-w-5xl">
        <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center">
          {/* Game title with animated letters */}
          <h1 className="text-white text-5xl font-bold mb-12">
            {Array.from("Letter Venture").map((char, index) => (
              <span 
                key={index} 
                className="inline-block animate-letter-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Play button */}
          <button 
            onClick={() => navigate("/game")}
            className="bg-game-blue text-white rounded-full w-24 h-24 flex items-center justify-center transition-all hover:scale-110 animate-pulse-glow focus:outline-none"
          >
            <Play size={40} fill="white" />
          </button>

          {/* Decorative elements */}
          <div className="absolute left-20 bottom-40 text-3xl font-bold text-orange-500 animate-float" style={{animationDelay: "0.2s"}}>
            S
          </div>
          <div className="absolute left-40 bottom-60 text-4xl font-bold text-blue-500 animate-float" style={{animationDelay: "0.5s"}}>
            E
          </div>
          <div className="absolute left-16 bottom-80 text-5xl font-bold text-red-500 animate-float" style={{animationDelay: "0.8s"}}>
            A
          </div>

          {/* Silhouettes */}
          <div className="absolute bottom-20 left-20">
            <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 70C20 52 35 50 40 50C45 50 50 52 60 52C70 52 75 50 80 50" stroke="rgba(0,150,255,0.5)" strokeWidth="2"/>
              <path d="M40 70V50M60 70V52" stroke="rgba(0,150,255,0.5)" strokeWidth="2"/>
              <circle cx="40" cy="40" r="10" fill="black"/>
              <circle cx="60" cy="45" r="7" fill="black"/>
            </svg>
          </div>

          {/* Space objects */}
          <div className="absolute top-20 right-20">
            <div className="w-16 h-16 rounded-full bg-yellow-400 bg-opacity-70 animate-pulse-glow"></div>
          </div>
          <div className="absolute top-40 right-40">
            <div className="w-20 h-20 rounded-full bg-blue-400 bg-opacity-70 animate-float" style={{animationDelay: "1s"}}>
              <div className="w-4 h-4 rounded-full bg-blue-200 absolute top-3 left-3"></div>
              <div className="w-2 h-2 rounded-full bg-blue-200 absolute top-10 left-12"></div>
            </div>
          </div>
          
          {/* 3D Robot in the bottom right corner */}
          <div className="absolute bottom-6 right-6 z-50 w-32 h-32">
            <Robot />
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default LandingPage;
