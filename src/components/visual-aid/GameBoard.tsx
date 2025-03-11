
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ConnectionLines from "./ConnectionLines";

/**
 * Interface for a matching item in the game
 */
interface Item {
  id: number;     // Unique identifier
  word: string;   // Word to match
  image: string;  // Image URL to match
}

/**
 * Props for the GameBoard component
 */
interface GameBoardProps {
  items: Item[];                     // Items to display and match
  activeConnection: {                // Currently active connection
    wordId: number | null;           // ID of selected word (if any)
    imageId: number | null;          // ID of selected image (if any)
  };
  completedConnections: number[];    // IDs of completed connections
  lineRef: React.RefObject<SVGSVGElement>;  // Reference for SVG lines
  onWordDotClick: (id: number) => void;     // Handler for word dot clicks
  onImageDotClick: (id: number) => void;    // Handler for image dot clicks
  getCoordinates: (wordId: number | null, imageId: number | null) => {
    x1: number;     // Line start x-coordinate
    y1: number;     // Line start y-coordinate
    x2: number;     // Line end x-coordinate
    y2: number;     // Line end y-coordinate
  } | null;         // Function to calculate line coordinates
}

/**
 * GameBoard Component for Visual Aid Game
 * 
 * Displays a matching game with words on the left and images on the right.
 * Players click dots next to words and images to create connections.
 * Shows lines between connected items and provides visual feedback.
 * 
 * @param items - Items (words and images) to match
 * @param activeConnection - Currently active connection
 * @param completedConnections - IDs of completed matches
 * @param lineRef - Reference for SVG connection lines
 * @param onWordDotClick - Function to call when a word dot is clicked
 * @param onImageDotClick - Function to call when an image dot is clicked
 * @param getCoordinates - Function to calculate line coordinates
 */
const GameBoard = ({
  items,
  activeConnection,
  completedConnections,
  lineRef,
  onWordDotClick,
  onImageDotClick,
  getCoordinates
}: GameBoardProps) => {
  return (
    <div className="relative">
      {/* Connection lines for matched and active pairs */}
      <ConnectionLines 
        lineRef={lineRef} 
        activeConnection={activeConnection} 
        completedConnections={completedConnections} 
        getCoordinates={getCoordinates} 
      />

      <div className="flex justify-between items-center">
        {/* Words column - left side */}
        <div className="w-2/5 space-y-8 z-20">
          {items.map((item, index) => (
            <div key={`word-${item.id}`} className="flex items-center justify-between">
              {/* Word text with entrance animation */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-white text-xl md:text-2xl font-bold px-[116px]"
              >
                {item.word}
              </motion.div>
              
              {/* Clickable connection dot next to word */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className={cn(
                  "w-6 h-6 rounded-full cursor-pointer ml-4 border-2 flex items-center justify-center transition-colors", 
                  completedConnections.includes(item.id) 
                    ? "bg-green-400 border-green-200"                     // Completed - green
                    : activeConnection.wordId === item.id 
                      ? "bg-blue-500 border-blue-300"                     // Active - blue
                      : "bg-slate-800 border-slate-600 hover:bg-slate-700" // Inactive - dark
                )}
                onClick={() => onWordDotClick(item.id)}
                data-word-dot={item.id}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Images column - right side */}
        <div className="w-1/2 grid grid-rows-4 gap-6 z-20">
          {items.map((item, index) => (
            <div key={`image-${item.id}`} className="flex items-center">
              {/* Clickable connection dot next to image */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className={cn(
                  "w-6 h-6 rounded-full cursor-pointer mr-4 border-2 flex items-center justify-center transition-colors", 
                  completedConnections.includes(item.id) 
                    ? "bg-green-400 border-green-200"                     // Completed - green
                    : activeConnection.imageId === item.id 
                      ? "bg-blue-500 border-blue-300"                     // Active - blue
                      : "bg-slate-800 border-slate-600 hover:bg-slate-700" // Inactive - dark
                )}
                onClick={() => onImageDotClick(item.id)}
                data-image-dot={item.id}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>
              
              {/* Image with entrance animation */}
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
    </div>
  );
};

export default GameBoard;
