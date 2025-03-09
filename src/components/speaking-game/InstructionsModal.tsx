
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

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1a3242] text-white border-cyan-400/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-cyan-300">
            How to Play: Speaking Activity
          </DialogTitle>
        </DialogHeader>
        
        <DialogDescription className="text-white text-base space-y-4">
          <div className="flex items-center gap-3 mt-4">
            <Mic className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <p>Read the text in the box aloud to practice your speaking skills.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Volume2 className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <p>Press the speaker button if you need help with pronunciation. Listen carefully and try to mimic the words.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Timer className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <p>The timer helps you track how long you practice. Try to read smoothly and clearly.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-2 flex-shrink-0">
              <Play className="h-8 w-8 text-cyan-300" />
              <Pause className="h-8 w-8 text-cyan-300" />
            </div>
            <p>Use the play/pause button to control the timer while you practice.</p>
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
