
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Props for the ReadingContent component
 */
interface ReadingContentProps {
  paragraphs: {                 // Array of paragraph objects
    id: number;                 // Unique paragraph ID
    text: string;               // Paragraph text
  }[];
  images: {                     // Array of image objects
    id: number;                 // Unique image ID
    src: string;                // Image source URL
    alt: string;                // Alt text for accessibility
  }[];
  pageId: number;               // Unique page ID to determine which story we're on
}

/**
 * ReadingContent Component
 * 
 * Displays the reading passage with paragraphs and images.
 * Each paragraph can be clicked to hear it read aloud using text-to-speech.
 * Visual indication shows which paragraph is currently being spoken.
 * 
 * @param paragraphs - Array of paragraph objects to display
 * @param images - Array of image objects to display
 * @param pageId - Unique page ID to determine which story we're on
 */
const ReadingContent = ({ paragraphs, images, pageId }: ReadingContentProps) => {
  // State to track which paragraph is currently being spoken
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  
  /**
   * Function to handle text-to-speech for a paragraph
   * 
   * @param text - The text to be spoken
   * @param paragraphId - ID of the paragraph being spoken
   */
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
    utterance.rate = 0.9;   // Slightly slower for better clarity
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

  /**
   * Determine which image to display based on page ID
   * This provides different illustrations for different pages of the story
   */
  const getImageSrc = () => {
    if (pageId === 2) {
      return "/lovable-uploads/b98e6455-de29-441d-9cc0-35d9f7c26bba.png";  // Girl watering flowers
    } else {
      return "/lovable-uploads/b36dd1ef-45ac-430d-abab-a2f7d940e502.png";  // Girl with cat
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Text content - paragraphs that can be clicked to hear them read aloud */}
      <div className="md:col-span-4 space-y-3">
        {paragraphs.map((paragraph) => (
          <motion.div
            key={paragraph.id}
            className={`text-white text-base leading-relaxed font-verdana cursor-pointer 
                      transition-all p-2 rounded-md
                      ${speakingId === paragraph.id ? 'bg-blue-500/30 shadow-md' : 'hover:bg-blue-500/10'}`}
            initial={{ opacity: 0, y: 20 }}                       // Start invisible and below final position
            animate={{ opacity: 1, y: 0 }}                        // Fade in and move to final position
            transition={{ duration: 0.5, delay: paragraph.id * 0.1 }}  // Staggered animation based on ID
            onClick={() => handleSpeakText(paragraph.text, paragraph.id)}
          >
            <div className="flex items-center">
              {/* Audio wave animation shown while speaking */}
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
      
      {/* Single image on the right side */}
      <div className="md:col-span-1 flex flex-col justify-start items-center">
        <motion.div
          className="bg-white p-2 rounded-lg shadow-lg w-full h-auto max-h-[180px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={getImageSrc()}
            alt={pageId === 2 ? "Girl watering flowers and boy playing piano" : "Girl with cat and boy on bike"}
            className="max-w-full max-h-full rounded object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ReadingContent;
