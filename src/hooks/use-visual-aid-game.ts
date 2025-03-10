
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Connection, Level } from "@/components/visual-aid/types";

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

export const useVisualAidGame = () => {
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

  return {
    currentLevel,
    activeConnection,
    completedConnections,
    robotSpeech,
    showHelp,
    lineRef,
    wordsRef,
    imagesRef,
    levels,
    handleWordDotClick,
    handleImageDotClick,
    handleNextLevel,
    toggleHelp,
    getCoordinates
  };
};
