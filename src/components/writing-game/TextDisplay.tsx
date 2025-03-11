
import { FC } from "react";

/**
 * Props that the TextDisplay component expects
 */
interface TextDisplayProps {
  targetText: string;       // The text the user needs to type
  cursorPosition: number;   // Current position of the cursor
  incorrectChars: number[]; // Array of character positions that were typed incorrectly
}

/**
 * TextDisplay Component
 * 
 * This component displays the text that the user needs to type, with visual feedback:
 * - Characters that haven't been typed yet appear gray
 * - Characters that were typed correctly appear white
 * - Characters that were typed incorrectly appear red
 * - The current position has a blinking cursor
 * 
 * @param targetText - The complete text the user needs to type
 * @param cursorPosition - The current position where the user is typing
 * @param incorrectChars - Positions of characters that were typed incorrectly
 */
const TextDisplay: FC<TextDisplayProps> = ({ targetText, cursorPosition, incorrectChars }) => {
  return (
    <div className="bg-[#395d6e] p-4 sm:p-6 rounded-md w-full relative text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
      {/* Split the text into individual characters and map over them */}
      {targetText.split('').map((char, index) => {
        // Determine the visual state for the current character
        const isCurrent = index === cursorPosition;          // Is this the cursor position?
        const isCompleted = index < cursorPosition;          // Has this character been typed?
        const isIncorrect = incorrectChars.includes(index);  // Was this character typed incorrectly?
        
        return (
          <span
            key={`char-${index}`}
            className={`
              ${isCurrent ? 'border-l-2 border-cyan-300 animate-pulse' : ''}   
              ${isCompleted && isIncorrect ? 'text-red-500' : ''}               
              ${isCompleted && !isIncorrect ? 'text-white' : ''}                
              ${!isCompleted ? 'text-gray-400' : ''}                            
            `}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
