
import { motion, AnimatePresence } from "framer-motion";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal = ({ isOpen, onClose }: InstructionsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-game-panel border-2 border-cyan-400 rounded-xl p-6 max-w-md m-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
            <ol className="list-decimal list-inside text-white space-y-2">
              <li>Tap the speaker icon to hear a word pronounced clearly.</li>
              <li>Use the virtual keyboard to type what you heard.</li>
              <li>Made a mistake? The trash icon lets you delete characters.</li>
              <li>Click submit when you're confident in your spelling.</li>
              <li>You get five attempts to spell each word correctly.</li>
              <li>After completing a word, press next to continue.</li>
            </ol>
            <div className="mt-6 flex justify-end">
              <motion.button
                className="bg-cyan-500/70 hover:bg-cyan-500/90 text-white px-4 py-2 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstructionsModal;
