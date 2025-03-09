
import { motion } from "framer-motion";

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
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      {/* Text content */}
      <div className="md:col-span-3 space-y-4">
        {paragraphs.map((paragraph) => (
          <motion.div
            key={paragraph.id}
            className="text-white text-base sm:text-lg leading-relaxed font-verdana"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: paragraph.id * 0.1 }}
          >
            {paragraph.text}
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
