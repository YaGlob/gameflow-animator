
import { FC } from "react";

interface TextDisplayProps {
  targetText: string;
  cursorPosition: number;
  incorrectChars: number[];
}

const TextDisplay: FC<TextDisplayProps> = ({ targetText, cursorPosition, incorrectChars }) => {
  return (
    <div className="bg-[#395d6e] p-4 sm:p-6 rounded-md w-full relative text-white text-base sm:text-lg md:text-xl leading-relaxed mobile-text">
      {targetText.split('').map((char, index) => {
        // Determine styling for current character
        const isCurrent = index === cursorPosition;
        const isCompleted = index < cursorPosition;
        const isIncorrect = incorrectChars.includes(index);
        
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
