
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-lg p-6 w-full max-w-xl border border-cyan-400/30 relative shadow-lg"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">How to Play</h2>
            
            <div className="space-y-4 text-white">
              <p className="text-lg">
                Welcome to the Writing Activity! Here's how to play:
              </p>
              
              <ol className="list-decimal list-inside space-y-2">
                <li>Read the text displayed on the screen.</li>
                <li>Type exactly what you see by clicking the on-screen keyboard.</li>
                <li>The cursor shows where your next character should be typed.</li>
                <li>If you type correctly, your text will appear in white.</li>
                <li>If you make a mistake, the incorrect letter will be shown in red.</li>
                <li>Try to type the entire text correctly to maximize your score!</li>
                <li>When you finish one exercise, click NEXT to continue to the next one.</li>
              </ol>
              
              <p>
                Score is calculated based on the number of correctly typed characters.
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={onClose} className="bg-cyan-600 hover:bg-cyan-700">
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstructionsModal;
