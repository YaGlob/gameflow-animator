
import { FC } from "react";

interface TextDisplayProps {
  text: string;
}

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
