
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
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3">
      <div className="md:col-span-3 space-y-3">
        {paragraphs.map((paragraph) => (
          <motion.div
            key={paragraph.id}
            className="text-white text-base leading-relaxed font-verdana"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: paragraph.id * 0.1 }}
          >
            {paragraph.text}
          </motion.div>
        ))}
      </div>
      <div className="md:col-span-1 flex flex-col space-y-2">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="bg-white p-1 rounded-lg shadow-lg h-20 md:h-28"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: image.id * 0.2 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full rounded object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReadingContent;
