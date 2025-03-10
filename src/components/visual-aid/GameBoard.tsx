
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ConnectionLines from "./ConnectionLines";

// Types
interface Item {
  id: number;
  word: string;
  image: string;
}

interface GameBoardProps {
  items: Item[];
  activeConnection: {
    wordId: number | null;
    imageId: number | null;
  };
  completedConnections: number[];
  lineRef: React.RefObject<SVGSVGElement>;
  onWordDotClick: (id: number) => void;
  onImageDotClick: (id: number) => void;
  getCoordinates: (wordId: number | null, imageId: number | null) => {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null;
}

const GameBoard = ({
  items,
  activeConnection,
  completedConnections,
  lineRef,
  onWordDotClick,
  onImageDotClick,
  getCoordinates,
}: GameBoardProps) => {
  return (
    <div className="relative">
      <ConnectionLines 
        lineRef={lineRef}
        activeConnection={activeConnection}
        completedConnections={completedConnections}
        getCoordinates={getCoordinates}
      />

      <div className="flex justify-between items-center">
        {/* Words column */}
        <div className="w-2/5 space-y-8 z-20">
          {items.map((item, index) => (
            <div 
              key={`word-${item.id}`}
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
                onClick={() => onWordDotClick(item.id)}
                data-word-dot={item.id}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Images column */}
        <div className="w-1/2 grid grid-rows-4 gap-6 z-20">
          {items.map((item, index) => (
            <div 
              key={`image-${item.id}`}
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
                onClick={() => onImageDotClick(item.id)}
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
    </div>
  );
};

export default GameBoard;
