
import { FC } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, Timer, Play, Pause } from "lucide-react";

/**
 * Props for the InstructionsModal component
 */
interface InstructionsModalProps {
  isOpen: boolean;     // Whether the modal is currently visible
  onClose: () => void; // Function to call when closing the modal
}

/**
 * InstructionsModal Component
 * 
 * This modal explains how to play the Speaking Activity.
 * It provides clear instructions with icons to help users
 * understand how to use each feature of the game.
 * 
 * @param isOpen - Boolean to control visibility of the modal
 * @param onClose - Function to call when the modal is closed
 */
const InstructionsModal: FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1a3242] text-white border-cyan-400/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-cyan-300">
            Speaking Activity Guide
          </DialogTitle>
        </DialogHeader>
        
        <DialogDescription className="text-white text-base space-y-4">
          {/* Instruction 1: Speaking */}
          <div className="flex items-center gap-3 mt-4">
            <Mic className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <p>Practice your pronunciation by reading the displayed text aloud with confidence.</p>
          </div>
          
          {/* Instruction 2: Audio Help */}
          <div className="flex items-center gap-3">
            <Volume2 className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <p>Need help with pronunciation? The speaker button provides an audio example you can imitate.</p>
          </div>
          
          {/* Instruction 3: Timer */}
          <div className="flex items-center gap-3">
            <Timer className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <p>The timer helps you track your practice duration. Focus on clarity rather than speed.</p>
          </div>
          
          {/* Instruction 4: Play/Pause */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2 flex-shrink-0">
              <Play className="h-8 w-8 text-cyan-300" />
              <Pause className="h-8 w-8 text-cyan-300" />
            </div>
            <p>Control your practice session with the play and pause buttons whenever needed.</p>
          </div>
        </DialogDescription>
        
        <DialogFooter className="mt-4">
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsModal;
