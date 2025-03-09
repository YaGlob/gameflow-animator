import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import SpeechBubble from "@/components/SpeechBubble";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types
type Item = {
  id: number;
  word: string;
  image: string;
};

type Level = {
  items: Item[];
};

type Connection = {
  wordId: number | null;
  imageId: number | null;
};

const VisualAidPage = () => {
  // Game levels
  const levels: Level[] = [
    {
      items: [
        { id: 1, word: "Flower", image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" },
        { id: 2, word: "Dog", image: "https://plus.unsplash.com/premium_photo-1676480245914-4f33f2c2899c" },
        { id: 3, word: "Girl", image: "/lovable-uploads/40627e9b-492d-4baa-adf7-5309ef4c5d3c.png" },
        { id: 4, word: "Pencil", image: "/lovable-uploads/1653c41a-eb28-4a62-ab2f-c60e2b4efe09.png" },
      ],
    },
    {
      items: [
        { id: 1, word: "Rock", image: "/lovable-uploads/f6ae6355-3a5f-4b58-b0fd-eb97af92682d.png" },
        { id: 2, word: "Lion", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d" },
        { id: 3, word: "Bottle", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8" },
        { id: 4, word: "Notebook", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57" },
      ],
    },
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [activeConnection, setActiveConnection] = useState<Connection>({ wordId: null, imageId: null });
  const [completedConnections, setCompletedConnections] = useState<number[]>([]);
  const [robotSpeech, setRobotSpeech] = useState("WELCOME TO THE VISUAL AID ACTIVITY! MATCH THE WORDS WITH THEIR IMAGES BY CONNECTING THE DOTS!");
  const [showHelp, setShowHelp] = useState(false);
  
  // Refs for drawing lines
  const lineRef = useRef<SVGSVGElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Reset game state when level changes
  useEffect(() => {
    setActiveConnection({ wordId: null, imageId: null });
    setCompletedConnections([]);
    setRobotSpeech("MATCH THE WORDS WITH THEIR IMAGES BY CONNECTING THE DOTS!");
  }, [currentLevel]);

  // Handle word dot click
  const handleWordDotClick = (id: number) => {
    if (completedConnections.includes(id)) return;
    
    // If clicking on the same dot, deselect it
    if (activeConnection.wordId === id) {
      setActiveConnection({ ...activeConnection, wordId: null });
      return;
    }
    
    // Set the active word
    setActiveConnection({ ...activeConnection, wordId: id });
    
    // If both word and image are selected, check if it's a match
    if (activeConnection.imageId !== null) {
      checkConnection(id, activeConnection.imageId);
    }
  };

  // Handle image dot click
  const handleImageDotClick = (id: number) => {
    if (completedConnections.includes(id)) return;
    
    // If clicking on the same dot, deselect it
    if (activeConnection.imageId === id) {
      setActiveConnection({ ...activeConnection, imageId: null });
      return;
    }
    
    // Set the active image
    setActiveConnection({ ...activeConnection, imageId: id });
    
    // If both word and image are selected, check if it's a match
    if (activeConnection.wordId !== null) {
      checkConnection(activeConnection.wordId, id);
    }
  };

  // Check if the connection is correct
  const checkConnection = (wordId: number, imageId: number) => {
    const isMatch = wordId === imageId;
    
    if (isMatch) {
      // Correct match
      setCompletedConnections([...completedConnections, wordId]);
      setActiveConnection({ wordId: null, imageId: null });
      
      // Congratulatory message
      setRobotSpeech(`GREAT JOB! YOU'VE MATCHED "${levels[currentLevel].items.find(item => item.id === wordId)?.word}" CORRECTLY!`);
      
      // Check if level is complete
      if (completedConnections.length + 1 === levels[currentLevel].items.length) {
        setTimeout(() => {
          setRobotSpeech("FANTASTIC! YOU'VE COMPLETED THIS SET! CLICK NEXT FOR MORE CHALLENGES!");
        }, 1500);
      }
    } else {
      // Incorrect match
      setRobotSpeech("OOPS! THAT'S NOT QUITE RIGHT. TRY AGAIN!");
      toast("Try another connection", {
        style: { background: "#ff6b6b", color: "white" }
      });
      
      // Clear the connection after a delay
      setTimeout(() => {
        setActiveConnection({ wordId: null, imageId: null });
      }, 800);
    }
  };

  // Go to next level
  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      // Cycle back to the first level
      setCurrentLevel(0);
      setRobotSpeech("LET'S PLAY AGAIN! MATCH THE WORDS WITH THEIR IMAGES!");
    }
  };

  // Toggle help
  const toggleHelp = () => {
    setShowHelp(!showHelp);
    if (!showHelp) {
      setRobotSpeech("CONNECT THE DOTS TO MATCH EACH WORD WITH ITS CORRESPONDING IMAGE. PRESS NEXT WHEN YOU'RE DONE!");
    } else {
      setRobotSpeech("LET'S CONTINUE! MATCH THE WORDS WITH THEIR IMAGES!");
    }
  };

  return (
    <GameLayout backTo="/game">
      <div className="w-full max-w-6xl mx-auto pt-4 pb-20 px-4 relative">
        {/* Help modal */}
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleHelp}></div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-slate-800 border-2 border-blue-400 rounded-xl p-6 max-w-md w-full relative z-10"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">How to Play</h2>
                <button 
                  onClick={toggleHelp}
                  className="text-white hover:text-blue-300 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 text-white">
                <p>1. Look at the words on the left and images on the right.</p>
                <p>2. Click on a dot next to a word, then click on a dot next to the matching image.</p>
                <p>3. If correct, the connection will be saved!</p>
                <p>4. Match all words with their images to complete the level.</p>
                <p>5. Click NEXT to move to the next level.</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
                  onClick={toggleHelp}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Game area */}
        <div className="relative bg-[#395d6e] rounded-lg p-6 min-h-[400px] shadow-lg border-2 border-blue-300/30">
          {/* SVG for drawing lines */}
          <svg 
            ref={lineRef} 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ overflow: 'visible' }}
          >
            {/* Active connection line */}
            {activeConnection.wordId !== null && activeConnection.imageId !== null && (
              <line
                x1={wordsRef.current[activeConnection.wordId - 1]?.getBoundingClientRect().right}
                y1={wordsRef.current[activeConnection.wordId - 1]?.getBoundingClientRect().top + 24}
                x2={imagesRef.current[activeConnection.imageId - 1]?.getBoundingClientRect().left}
                y2={imagesRef.current[activeConnection.imageId - 1]?.getBoundingClientRect().top + 24}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
            
            {/* Completed connection lines */}
            {completedConnections.map(id => (
              <line
                key={`connection-${id}`}
                x1={wordsRef.current[id - 1]?.getBoundingClientRect().right}
                y1={wordsRef.current[id - 1]?.getBoundingClientRect().top + 24}
                x2={imagesRef.current[id - 1]?.getBoundingClientRect().left}
                y2={imagesRef.current[id - 1]?.getBoundingClientRect().top + 24}
                stroke="#4fd1c5"
                strokeWidth="3"
              />
            ))}
          </svg>

          <div className="flex justify-between">
            {/* Words column */}
            <div className="w-1/3 space-y-8 z-20">
              {levels[currentLevel].items.map((item, index) => (
                <div 
                  key={`word-${item.id}`}
                  ref={el => wordsRef.current[item.id - 1] = el}
                  className="flex items-center justify-between"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-white text-2xl md:text-3xl font-bold"
                  >
                    {item.word}
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer ml-4 border-2 transition-colors",
                      completedConnections.includes(item.id) 
                        ? "bg-green-400 border-green-200" 
                        : activeConnection.wordId === item.id
                          ? "bg-blue-500 border-blue-300" 
                          : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                    )}
                    onClick={() => handleWordDotClick(item.id)}
                  />
                </div>
              ))}
            </div>
            
            {/* Images column */}
            <div className="w-1/2 space-y-4 flex flex-col justify-between z-20">
              {levels[currentLevel].items.map((item, index) => (
                <div 
                  key={`image-${item.id}`}
                  ref={el => imagesRef.current[item.id - 1] = el}
                  className="flex items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer mr-4 border-2 transition-colors",
                      completedConnections.includes(item.id) 
                        ? "bg-green-400 border-green-200" 
                        : activeConnection.imageId === item.id
                          ? "bg-blue-500 border-blue-300" 
                          : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                    )}
                    onClick={() => handleImageDotClick(item.id)}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="w-24 h-24 rounded-md overflow-hidden border-2 border-white/30"
                  >
                    <img 
                      src={item.image} 
                      alt={item.word}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom controls - NEXT button and Help button side by side */}
        <div className="absolute left-4 bottom-4 z-20 flex items-center gap-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold py-2 px-8 rounded-lg transition-colors shadow-lg"
            onClick={handleNextLevel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NEXT
          </motion.button>
          
          {/* Help button - Fixed the TypeScript error by removing motion props */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-blue-500/30 hover:bg-blue-500/50 border-blue-300 text-white w-12 h-12 rounded-full"
              onClick={toggleHelp}
            >
              ?
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Robot with speech bubble */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="mb-2 mr-4">
          <SpeechBubble text={robotSpeech} delay={0.2} />
        </div>
        <RobotScene variant={completedConnections.length === levels[currentLevel].items.length ? "happy" : "normal"} />
      </div>
    </GameLayout>
  );
};

export default VisualAidPage;
