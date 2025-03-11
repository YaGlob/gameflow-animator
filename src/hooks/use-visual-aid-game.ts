
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Connection, Level } from "@/components/visual-aid/types";

// Game levels data - each level has items with matching words and images
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

// Custom hook that contains all the logic for the visual aid game
export const useVisualAidGame = () => {
  // State variables to track the game's state
  const [currentLevel, setCurrentLevel] = useState(0);                          // Current level index
  const [activeConnection, setActiveConnection] = useState<Connection>({ wordId: null, imageId: null });  // Current connection being made
  const [completedConnections, setCompletedConnections] = useState<number[]>([]);  // Successfully matched items
  const [robotSpeech, setRobotSpeech] = useState("WELCOME TO THE VISUAL AID ACTIVITY! MATCH THE WORDS WITH THEIR IMAGES BY CONNECTING THE DOTS!");  // Robot's speech
  const [showHelp, setShowHelp] = useState(false);                              // Whether to show help modal
  
  // References for drawing connection lines
  const lineRef = useRef<SVGSVGElement>(null);              // Reference to the SVG element
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);   // References to word elements
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);  // References to image elements
  
  // Reset game state when level changes
  useEffect(() => {
    setActiveConnection({ wordId: null, imageId: null });  // Clear active connection
    setCompletedConnections([]);                          // Clear completed connections
    setRobotSpeech("MATCH THE WORDS WITH THEIR IMAGES BY CONNECTING THE DOTS!");  // Reset robot speech
  }, [currentLevel]);  // Run this effect whenever currentLevel changes

  // Handle word dot click - start or complete a connection
  const handleWordDotClick = (id: number) => {
    // If this word is already connected, do nothing
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

  // Handle image dot click - start or complete a connection
  const handleImageDotClick = (id: number) => {
    // If this image is already connected, do nothing
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

  // Check if the connection is correct (matching IDs)
  const checkConnection = (wordId: number, imageId: number) => {
    // A match is when the word ID equals the image ID
    const isMatch = wordId === imageId;
    
    if (isMatch) {
      // Correct match - add to completed connections
      setCompletedConnections([...completedConnections, wordId]);
      setActiveConnection({ wordId: null, imageId: null });  // Clear active connection
      
      // Update robot speech with congratulatory message
      setRobotSpeech(`GREAT JOB! YOU'VE MATCHED "${levels[currentLevel].items.find(item => item.id === wordId)?.word}" CORRECTLY!`);
      
      // Check if level is complete (all items matched)
      if (completedConnections.length + 1 === levels[currentLevel].items.length) {
        setTimeout(() => {
          setRobotSpeech("FANTASTIC! YOU'VE COMPLETED THIS SET! CLICK NEXT FOR MORE CHALLENGES!");
        }, 1500);
      }
    } else {
      // Incorrect match - update robot speech
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

  // Go to next level or cycle back to first level
  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      // Go to next level if there is one
      setCurrentLevel(currentLevel + 1);
    } else {
      // Cycle back to the first level
      setCurrentLevel(0);
      setRobotSpeech("LET'S PLAY AGAIN! MATCH THE WORDS WITH THEIR IMAGES!");
    }
  };

  // Toggle help modal and update robot speech
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
    
    // Find the DOM elements for the word and image dots
    const wordDot = document.querySelector(`[data-word-dot="${wordId}"]`);
    const imageDot = document.querySelector(`[data-image-dot="${imageId}"]`);
    
    if (!wordDot || !imageDot) return null;
    
    // Get their positions on the screen
    const wordRect = wordDot.getBoundingClientRect();
    const imageRect = imageDot.getBoundingClientRect();
    const svgRect = lineRef.current?.getBoundingClientRect();
    
    if (!svgRect) return null;
    
    // Calculate the coordinates for the line connecting them
    return {
      x1: wordRect.right - svgRect.left,               // Start x-coordinate (right edge of word dot)
      y1: wordRect.top + wordRect.height/2 - svgRect.top,  // Start y-coordinate (middle of word dot)
      x2: imageRect.left - svgRect.left,               // End x-coordinate (left edge of image dot)
      y2: imageRect.top + imageRect.height/2 - svgRect.top  // End y-coordinate (middle of image dot)
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

  // Return all the values and functions needed by the visual aid game component
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
