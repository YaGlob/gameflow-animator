
import { motion } from "framer-motion";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-slate-800 border-2 border-blue-400 rounded-xl p-6 max-w-md w-full relative z-10"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">How to Play</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-300 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4 text-white">
          <p>1. Examine the words on the left side and images on the right.</p>
          <p>2. Begin by selecting a dot next to any word, then find its matching image.</p>
          <p>3. When correctly matched, a permanent connection line appears!</p>
          <p>4. Complete the level by successfully connecting all pairs.</p>
          <p>5. Progress to new challenges by clicking the Next button.</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
            onClick={onClose}
          >
            Got it!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HelpModal;
