
import { FC } from "react";

/**
 * Props for the TextDisplay component
 */
interface TextDisplayProps {
  text: string;  // The text to be displayed and spoken by the user
}

/**
 * TextDisplay Component for Speaking Game
 * 
 * Displays the text that the user needs to read aloud.
 * This component uses a styled container with a cyan border and
 * blue-green background to match the space theme of the game.
 * 
 * @param text - The text the user needs to practice speaking
 */
const TextDisplay: FC<TextDisplayProps> = ({ text }) => {
  return (
    <div className="bg-[#395d6e] p-4 sm:p-6 rounded-xl w-full max-w-5xl mx-auto shadow-lg border border-cyan-300/30">
      <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-verdana leading-relaxed text-center">
        {text}
      </p>
    </div>
  );
};

export default TextDisplay;
