
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Volume2
} from "lucide-react";
import { motion } from "framer-motion";

interface GameControlsProps {
  isPlaying: boolean;
  timeElapsed: string;
  onTogglePlayPause: () => void;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
  onNext: () => void;
  onHelp: () => void;
}

const GameControls: FC<GameControlsProps> = ({
  isPlaying,
  timeElapsed,
  onTogglePlayPause,
  onPlayAudio,
  isAudioPlaying,
  onNext,
  onHelp,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Main controls */}
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Play/Pause button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onTogglePlayPause} 
            size="icon"
            className="h-16 w-16 rounded-full bg-blue-500/70 hover:bg-blue-600/70 text-white"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
        </motion.div>
        
        {/* Timer display */}
        <div className="bg-cyan-300 px-6 py-3 rounded-md text-2xl font-bold font-mono text-gray-900">
          {timeElapsed}
        </div>
        
        {/* Audio button */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          animate={isAudioPlaying ? {
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1 }
          } : {}}
        >
          <Button 
            onClick={onPlayAudio} 
            size="icon"
            disabled={isAudioPlaying}
            className="h-16 w-16 rounded-full bg-blue-500/70 hover:bg-blue-600/70 text-white"
          >
            <Volume2 className="h-8 w-8" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameControls;
