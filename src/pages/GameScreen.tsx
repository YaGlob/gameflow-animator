
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
      <div className="flex flex-col items-center justify-between h-screen w-full max-w-5xl py-4 sm:py-8">
        {/* Main game screen */}
        <div className="relative w-full h-[40vh] sm:h-[50vh] bg-game-panel rounded-lg flex items-center justify-center mb-4 sm:mb-8 shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-center text-white">SCREEN</h1>
        </div>
        
        {/* Letter selection area */}
        <div className="w-full bg-game-panel rounded-lg p-4 sm:p-8 flex flex-wrap justify-center gap-2 sm:gap-4 shadow-2xl">
          {letters.map((letter) => (
            <button
              key={letter}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all ${
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
        
        {/* Navigation buttons - larger touch targets for mobile */}
        <div className="w-full flex justify-between mt-4 sm:mt-8">
          <Link 
            to="/landing" 
            className="bg-game-blue/80 hover:bg-game-blue text-white rounded-full p-3 sm:p-4 transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          
          <Link 
            to="/" 
            className="bg-game-blue/80 hover:bg-game-blue text-white rounded-full p-3 sm:p-4 transition-colors touch-manipulation"
          >
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </div>
        
        {/* Robot in the bottom right corner - smaller on mobile */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transform scale-75 sm:scale-100">
          <Robot />
        </div>
      </div>
    </GameLayout>
  );
};

export default GameScreen;
