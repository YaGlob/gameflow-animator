import { FC } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Volume2,
  Mic,
  CheckCircle,
  XCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface GameControlsProps {
  isPlaying: boolean;
  timeElapsed: string;
  onTogglePlayPause: () => void;
  onPlayAudio: () => void;
  isAudioPlaying: boolean;
  isRecording?: boolean;
  recordingResult?: 'success' | 'error' | null;
  transcript?: string;
  onNext: () => void;
  onHelp: () => void;
}

const GameControls: FC<GameControlsProps> = ({
  isPlaying,
  timeElapsed,
  onTogglePlayPause,
  onPlayAudio,
  isAudioPlaying,
  isRecording = false,
  recordingResult = null,
  transcript = '',
  onNext,
  onHelp,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Main controls */}
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Play/Pause button with recording indicator */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          animate={isRecording ? {
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1 }
          } : {}}
        >
          <Button 
            onClick={onTogglePlayPause} 
            size="icon"
            className={`h-16 w-16 rounded-full text-white ${
              recordingResult === 'success' 
                ? 'bg-green-500 hover:bg-green-600' 
                : recordingResult === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500/70 hover:bg-blue-600/70'
            }`}
          >
            {isPlaying ? (
              <Mic className="h-8 w-8 animate-pulse" />
            ) : (
              recordingResult === 'success' ? (
                <CheckCircle className="h-8 w-8" />
              ) : recordingResult === 'error' ? (
                <XCircle className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )
            )}
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

      {/* Transcript display */}
      {transcript && (
        <div className="w-full max-w-2xl bg-white/10 p-4 rounded-lg mt-2">
          <h3 className="text-white text-sm font-semibold mb-1">Your Speech:</h3>
          <p className="text-white/90 text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default GameControls;
