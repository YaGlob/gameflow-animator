
import { useState } from "react";
import { motion } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import SpeechBubble from "@/components/SpeechBubble";
import { cn } from "@/lib/utils";

type LetterInfo = {
  uppercase: string;
  lowercase: string;
  examples?: string[];
};

const AlphabetsPage = () => {
  const [selectedLetter, setSelectedLetter] = useState<LetterInfo | null>(null);
  const [robotSpeech, setRobotSpeech] = useState<string>(
    "THERE ARE 26 LETTERS IN THE ALPHABET! HERE THEY ARE! CLICK ON ANY LETTER TO UNVEIL THE MAGIC THAT AWAITS!"
  );
  const [showLetterDetail, setShowLetterDetail] = useState(false);

  // Generate alphabet array with full letter info
  const alphabet: LetterInfo[] = [
    { uppercase: "A", lowercase: "a", examples: ["Apple", "Astronaut", "Ant"] },
    { uppercase: "B", lowercase: "b", examples: ["Ball", "Balloon", "Butterfly"] },
    { uppercase: "C", lowercase: "c", examples: ["Cat", "Car", "Cookie"] },
    { uppercase: "D", lowercase: "d", examples: ["Dog", "Diamond", "Duck"] },
    { uppercase: "E", lowercase: "e", examples: ["Elephant", "Earth", "Eagle"] },
    { uppercase: "F", lowercase: "f", examples: ["Fish", "Flower", "Frog"] },
    { uppercase: "G", lowercase: "g", examples: ["Giraffe", "Garden", "Guitar"] },
    { uppercase: "H", lowercase: "h", examples: ["House", "Hat", "Horse"] },
    { uppercase: "I", lowercase: "i", examples: ["Ice cream", "Igloo", "Island"] },
    { uppercase: "J", lowercase: "j", examples: ["Jellyfish", "Juice", "Jungle"] },
    { uppercase: "K", lowercase: "k", examples: ["Kite", "Koala", "Keyboard"] },
    { uppercase: "L", lowercase: "l", examples: ["Lion", "Lemon", "Leaf"] },
    { uppercase: "M", lowercase: "m", examples: ["Moon", "Monkey", "Mountain"] },
    { uppercase: "N", lowercase: "n", examples: ["Nest", "Night", "Nose"] },
    { uppercase: "O", lowercase: "o", examples: ["Orange", "Ocean", "Owl"] },
    { uppercase: "P", lowercase: "p", examples: ["Penguin", "Piano", "Pizza"] },
    { uppercase: "Q", lowercase: "q", examples: ["Queen", "Quilt", "Question"] },
    { uppercase: "R", lowercase: "r", examples: ["Rainbow", "Robot", "Rocket"] },
    { uppercase: "S", lowercase: "s", examples: ["Sun", "Star", "Snake"] },
    { uppercase: "T", lowercase: "t", examples: ["Tree", "Tiger", "Train"] },
    { uppercase: "U", lowercase: "u", examples: ["Umbrella", "Unicorn", "Universe"] },
    { uppercase: "V", lowercase: "v", examples: ["Volcano", "Violin", "Vegetables"] },
    { uppercase: "W", lowercase: "w", examples: ["Water", "Whale", "Window"] },
    { uppercase: "X", lowercase: "x", examples: ["Xylophone", "X-ray", "Box"] },
    { uppercase: "Y", lowercase: "y", examples: ["Yacht", "Yo-yo", "Yellow"] },
    { uppercase: "Z", lowercase: "z", examples: ["Zebra", "Zoo", "Zipper"] },
  ];

  const handleLetterClick = (letter: LetterInfo) => {
    setSelectedLetter(letter);
    setShowLetterDetail(true);
    setRobotSpeech(`EXCELLENT CHOICE! "${letter.uppercase}" IS FOR ${letter.examples?.[0]}, ${letter.examples?.[1]}, AND ${letter.examples?.[2]}!`);
  };

  const closeLetterDetail = () => {
    setShowLetterDetail(false);
    setRobotSpeech("GREAT JOB! WHICH LETTER WOULD YOU LIKE TO LEARN NEXT?");
  };

  // Letter tile component
  const LetterTile = ({ letter, index }: { letter: LetterInfo; index: number }) => {
    const isSelected = selectedLetter?.uppercase === letter.uppercase;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.3, 
          delay: index * 0.03,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 0 15px rgba(79, 209, 255, 0.8)" 
        }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-white rounded-md transition-colors cursor-pointer",
          "bg-slate-800 hover:bg-slate-700",
          isSelected && "ring-4 ring-blue-400 bg-blue-800 hover:bg-blue-700"
        )}
        onClick={() => handleLetterClick(letter)}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          {letter.uppercase}{letter.lowercase}
        </span>
      </motion.div>
    );
  };

  return (
    <GameLayout backTo="/game">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4">
        {/* Main content container box with specified properties - reduced padding for more space */}
        <div className="w-full p-4 rounded-xl backdrop-blur-md bg-game-panel flex flex-col items-center relative z-10">
          {/* Alphabet grid - optimized number of columns for larger tiles */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 w-full">
            {alphabet.map((letter, index) => (
              <LetterTile key={letter.uppercase} letter={letter} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Selected letter detail modal */}
      {showLetterDetail && selectedLetter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeLetterDetail}></div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-800 border-2 border-blue-400 rounded-xl p-6 max-w-md w-full relative z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-bold text-white">
                {selectedLetter.uppercase}{selectedLetter.lowercase}
              </h2>
              <button 
                onClick={closeLetterDetail}
                className="text-white hover:text-blue-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-8xl font-bold bg-gradient-to-br from-blue-300 to-purple-400 bg-clip-text text-transparent">
                  {selectedLetter.uppercase}{selectedLetter.lowercase}
                </span>
              </div>
              
              <div className="space-y-2 mt-4">
                <h3 className="text-xl text-blue-300 font-semibold">Examples:</h3>
                <ul className="space-y-2">
                  {selectedLetter.examples?.map((example, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.1) }}
                      className="text-lg text-white flex items-center"
                    >
                      <span className="text-blue-400 mr-2">•</span> {example}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
                onClick={closeLetterDetail}
              >
                Continue Exploring
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Repositioned Robot with speech bubble to match the provided image */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
        <div className="mb-3">
          <SpeechBubble text={robotSpeech} delay={0.2} />
        </div>
        <RobotScene variant={selectedLetter ? "happy" : "normal"} />
      </div>
    </GameLayout>
  );
};

export default AlphabetsPage;
