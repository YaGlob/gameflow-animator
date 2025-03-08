
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import Robot from "@/components/Robot";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GameScreen = () => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j'];
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  
  return (
    <GameLayout backTo="/landing">
      <div className="flex flex-col items-center justify-between h-screen w-full max-w-5xl py-8">
        {/* Main game screen */}
        <div className="relative w-full h-[50vh] bg-game-panel rounded-lg flex items-center justify-center mb-8 shadow-2xl">
          <h1 className="text-6xl font-bold text-center text-black">SCREEN</h1>
        </div>
        
        {/* Letter selection area */}
        <div className="w-full bg-game-panel rounded-lg p-8 flex flex-wrap justify-center gap-4 shadow-2xl">
          {letters.map((letter) => (
            <button
              key={letter}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedLetter === letter 
                  ? 'bg-game-blue text-white border-white' 
                  : 'bg-transparent text-white border-game-blue hover:bg-game-blue/20'
              }`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="w-full flex justify-between mt-8">
          <Link 
            to="/landing" 
            className="bg-game-blue/80 hover:bg-game-blue text-white rounded-full p-4 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          
          <Link 
            to="/" 
            className="bg-game-blue/80 hover:bg-game-blue text-white rounded-full p-4 transition-colors"
          >
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
        
        {/* 3D Robot in the bottom right corner */}
        <div className="absolute bottom-6 right-6 z-50">
          <Robot />
        </div>
      </div>
    </GameLayout>
  );
};

export default GameScreen;
