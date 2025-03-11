
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

// Props that the GameControls component expects
interface GameControlsProps {
  isPlaying: boolean;                                // Whether recording is active
  timeElapsed: string;                               // Formatted timer display (MM:SS)
  onTogglePlayPause: () => void;                     // Function to start/stop recording
  onPlayAudio: () => void;                           // Function to play example audio
  isAudioPlaying: boolean;                           // Whether audio is currently playing
  isRecording?: boolean;                             // Whether microphone is recording
  recordingResult?: 'success' | 'error' | null;      // Result of speech recognition
  transcript?: string;                               // Recognized speech text
  onNext: () => void;                                // Function to go to next exercise
  onHelp: () => void;                                // Function to show help instructions
}

// Component that displays the controls for the speaking game
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
    <div className="w-full flex flex-col items-center gap-6 max-w-4xl mx-auto">
      {/* Main controls - Play/Record, Timer, and Audio buttons */}
      <div className="flex items-center justify-center gap-6 w-full">
        {/* Play/Pause button with recording indicator */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          animate={isRecording ? {
            scale: [1, 1.1, 1],                      // Pulsing animation during recording
            transition: { repeat: Infinity, duration: 1 }
          } : {}}
        >
          <Button 
            onClick={onTogglePlayPause} 
            size="icon"
            className={`h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full text-white ${
              recordingResult === 'success' 
                ? 'bg-green-500 hover:bg-green-600'   // Success - green
                : recordingResult === 'error'
                  ? 'bg-red-500 hover:bg-red-600'     // Error - red
                  : isRecording
                    ? 'bg-red-500 hover:bg-red-600'   // Recording - red
                    : 'bg-blue-500/70 hover:bg-blue-600/70'  // Not recording - blue
            }`}
          >
            {isPlaying ? (
              <Mic className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 animate-pulse" />
            ) : (
              recordingResult === 'success' ? (
                <CheckCircle className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
              ) : recordingResult === 'error' ? (
                <XCircle className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
              ) : (
                <Play className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
              )
            )}
          </Button>
        </motion.div>
        
        {/* Timer display */}
        <div className="bg-cyan-300 px-6 py-3 md:px-8 md:py-4 rounded-md text-2xl md:text-3xl font-bold font-mono text-gray-900">
          {timeElapsed}
        </div>
        
        {/* Audio button - plays example audio */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          animate={isAudioPlaying ? {
            scale: [1, 1.1, 1],                     // Pulsing animation during audio playback
            transition: { repeat: Infinity, duration: 1 }
          } : {}}
        >
          <Button 
            onClick={onPlayAudio} 
            size="icon"
            disabled={isAudioPlaying}              // Disable while audio is playing
            className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full bg-blue-500/70 hover:bg-blue-600/70 text-white"
          >
            <Volume2 className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
          </Button>
        </motion.div>
      </div>

      {/* Transcript display - shows recognized speech */}
      {transcript && (
        <div className="w-full max-w-2xl bg-white/10 p-4 rounded-lg mt-2 mx-auto">
          <h3 className="text-white text-sm font-semibold mb-1">Your Speech:</h3>
          <p className="text-white/90 text-sm md:text-base">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default GameControls;
