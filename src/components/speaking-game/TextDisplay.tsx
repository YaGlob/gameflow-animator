
import { FC } from "react";

interface TextDisplayProps {
  text: string;
}

const TextDisplay: FC<TextDisplayProps> = ({ text }) => {
  return (
    <div className="bg-[#395d6e] p-4 sm:p-6 rounded-xl w-full shadow-lg border border-cyan-300/30">
      <p className="text-white text-base sm:text-xl md:text-2xl font-verdana leading-relaxed mobile-text">
        {text}
      </p>
    </div>
  );
};

export default TextDisplay;
