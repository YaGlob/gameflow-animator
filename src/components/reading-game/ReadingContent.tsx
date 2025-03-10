
import { motion } from "framer-motion";
import { useState } from "react";

interface ReadingContentProps {
  paragraphs: {
    id: number;
    text: string;
  }[];
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}

const ReadingContent = ({ paragraphs, images }: ReadingContentProps) => {
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  
  // Function to handle text-to-speech for a paragraph
  const handleSpeakText = (text: string, paragraphId: number) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // If clicking on already speaking paragraph, just stop
    if (speakingId === paragraphId) {
      setSpeakingId(null);
      return;
    }

    // Create a new utterance with the paragraph text
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties for better speech quality
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to get an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.includes('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    // Set the speaking state to show visual indicator
    setSpeakingId(paragraphId);
    
    // When speech ends, reset the speaking state
    utterance.onend = () => {
      setSpeakingId(null);
    };
    
    // When an error occurs, reset the speaking state
    utterance.onerror = () => {
      setSpeakingId(null);
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      {/* Text content */}
      <div className="md:col-span-3 space-y-4">
        {paragraphs.map((paragraph) => (
          <motion.div
            key={paragraph.id}
            className={`text-white text-base sm:text-lg leading-relaxed font-verdana cursor-pointer 
                      transition-all p-2 rounded-md
                      ${speakingId === paragraph.id ? 'bg-blue-500/30 shadow-md' : 'hover:bg-blue-500/10'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: paragraph.id * 0.1 }}
            onClick={() => handleSpeakText(paragraph.text, paragraph.id)}
          >
            <div className="flex items-center">
              {speakingId === paragraph.id && (
                <motion.div
                  className="mr-2 flex space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.span 
                    className="inline-block h-2 w-2 bg-blue-400 rounded-full"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                  <motion.span 
                    className="inline-block h-2 w-2 bg-blue-400 rounded-full"
                    animate={{ scaleY: [1, 2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.span 
                    className="inline-block h-2 w-2 bg-blue-400 rounded-full"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                </motion.div>
              )}
              {paragraph.text}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Images */}
      <div className="md:col-span-1 flex flex-col space-y-4">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="bg-white p-2 rounded-lg shadow-lg h-32 md:h-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: image.id * 0.2 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full rounded object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReadingContent;
