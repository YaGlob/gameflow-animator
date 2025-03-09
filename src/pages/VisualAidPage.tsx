import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GameLayout from "@/components/GameLayout";
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
        { id: 1, word: "Flower", image: "/images/Visualaid/Flower.png" },
        { id: 2, word: "Dog", image: "/images/Visualaid/Dog.png" },
        { id: 3, word: "Girl", image: "/images/Visualaid/Girl.png" },
        { id: 4, word: "Pencil", image: "/images/Visualaid/pencil.png" },
      ],
    },
    {
      items: [
        { id: 1, word: "Rock", image: "/images/Visualaid/Rock.png" },
        { id: 2, word: "Lion", image: "/images/Visualaid/Lion.png" },
        { id: 3, word: "Bottle", image: "/images/Visualaid/bottle.png" },
        { id: 4, word: "Notebook", image: "/images/Visualaid/Notebook.png" },
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

  // Function to get accurate coordinates for the connection lines
  const getCoordinates = (wordId: number | null, imageId: number | null) => {
    if (!wordId || !imageId) return null;
    
    const wordDot = document.querySelector(`[data-word-dot="${wordId}"]`);
    const imageDot = document.querySelector(`[data-image-dot="${imageId}"]`);
    
    if (!wordDot || !imageDot) return null;
    
    const wordRect = wordDot.getBoundingClientRect();
    const imageRect = imageDot.getBoundingClientRect();
    const svgRect = lineRef.current?.getBoundingClientRect();
    
    if (!svgRect) return null;
    
    return {
      x1: wordRect.right - svgRect.left,
      y1: wordRect.top + wordRect.height/2 - svgRect.top,
      x2: imageRect.left - svgRect.left,
      y2: imageRect.top + imageRect.height/2 - svgRect.top
    };
  };

  // Recalculate line positions when window resizes
  useEffect(() => {
    const handleResize = () => {
      // Force update to recalculate positions
      setActiveConnection({...activeConnection});
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeConnection]);

  return (
    <GameLayout backTo="/game">
      <div className="w-full mx-auto relative">
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
        <div className="relative bg-[#395d6e] rounded-lg p-6 shadow-lg border-2 border-blue-300/30">
          {/* SVG for drawing lines */}
          <svg 
            ref={lineRef} 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ overflow: 'visible' }}
          >
            {/* Active connection line */}
            {activeConnection.wordId !== null && activeConnection.imageId !== null && (
              <line
                x1={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.x1 || 0}
                y1={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.y1 || 0}
                x2={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.x2 || 0}
                y2={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.y2 || 0}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
            
            {/* Completed connection lines */}
            {completedConnections.map(id => (
              <line
                key={`connection-${id}`}
                x1={getCoordinates(id, id)?.x1 || 0}
                y1={getCoordinates(id, id)?.y1 || 0}
                x2={getCoordinates(id, id)?.x2 || 0}
                y2={getCoordinates(id, id)?.y2 || 0}
                stroke="#4fd1c5"
                strokeWidth="3"
              />
            ))}
          </svg>

          <div className="flex justify-between items-center">
            {/* Words column */}
            <div className="w-2/5 space-y-8 z-20">
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
                    className="text-white text-xl md:text-2xl font-bold"
                  >
                    {item.word}
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={cn(
                      "w-6 h-6 rounded-full cursor-pointer ml-4 border-2 flex items-center justify-center transition-colors",
                      completedConnections.includes(item.id) 
                        ? "bg-green-400 border-green-200" 
                        : activeConnection.wordId === item.id
                          ? "bg-blue-500 border-blue-300" 
                          : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                    )}
                    onClick={() => handleWordDotClick(item.id)}
                    data-word-dot={item.id}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Images column */}
            <div className="w-1/2 grid grid-rows-4 gap-6 z-20">
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
                      "w-6 h-6 rounded-full cursor-pointer mr-4 border-2 flex items-center justify-center transition-colors",
                      completedConnections.includes(item.id) 
                        ? "bg-green-400 border-green-200" 
                        : activeConnection.imageId === item.id
                          ? "bg-blue-500 border-blue-300" 
                          : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                    )}
                    onClick={() => handleImageDotClick(item.id)}
                    data-image-dot={item.id}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="w-20 h-20 rounded-md overflow-hidden border-2 border-white/30"
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
          
          {/* Bottom controls */}
          <div className="mt-8 flex items-center gap-3">
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
      </div>

      {/* Robot with speech bubble */}
      <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
        <motion.div 
          className="w-32 h-32 sm:w-40 sm:h-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <img 
            src="/images/robot-visual-aid.png" 
            alt="Robot Assistant" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="ml-3 mb-8">
          <SpeechBubble text={robotSpeech} delay={0.2} />
        </div>
      </div>
    </GameLayout>
  );
};

export default VisualAidPage;
