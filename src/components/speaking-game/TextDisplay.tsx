
import { FC } from "react";

interface TextDisplayProps {
  text: string;
}

const TextDisplay: FC<TextDisplayProps> = ({ text }) => {
  return (
    <div className="bg-white p-6 rounded-xl w-full shadow-lg border-4 border-purple-300">
      <p className="text-black text-xl sm:text-2xl font-verdana leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default TextDisplay;
