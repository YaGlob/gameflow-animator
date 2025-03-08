
import Planet from "./Planet";
import { motion } from "framer-motion";

const PlanetarySystem = () => {
  return (
    <div className="absolute top-10 right-10 md:right-20 w-60 h-60 pointer-events-none z-20">
      {/* Saturn-like planet */}
      <Planet
        size={60}
        color="#ffcc80"
        orbitRadius={120}
        orbitDuration={120}
        rotationDuration={30}
        className="overflow-visible"
      >
        {/* Saturn's ring */}
        <motion.div
          className="absolute w-[75px] h-[18px] bg-[#ffe0b2] rounded-full opacity-80"
          style={{
            transform: "rotateX(75deg)",
            boxShadow: "0 0 5px rgba(255, 224, 178, 0.8)",
          }}
        />
        {/* Cute face */}
        <div className="relative">
          <div className="absolute w-2 h-3 rounded-full bg-black left-2 top-3 transform -rotate-12" />
          <div className="absolute w-2 h-3 rounded-full bg-black right-2 top-3 transform rotate-12" />
          <div className="absolute w-6 h-3 rounded-full bg-transparent border-b-2 border-black left-[22%] top-6" />
        </div>
      </Planet>

      {/* Blue planet (Neptune-like) */}
      <Planet
        size={80}
        color="#81d4fa"
        orbitRadius={100}
        orbitDuration={60}
        rotationDuration={25}
        orbitDelay={2}
      >
        {/* Cute face */}
        <div className="relative">
          <div className="absolute w-3 h-4 rounded-full bg-white left-6 top-4">
            <div className="absolute w-2 h-2 rounded-full bg-[#ff5252] top-1 left-0.5" />
          </div>
          <div className="absolute w-3 h-4 rounded-full bg-white right-6 top-4">
            <div className="absolute w-2 h-2 rounded-full bg-[#ff5252] top-1 left-0.5" />
          </div>
          <div className="absolute w-10 h-4 rounded-full bg-transparent border-b-2 border-white left-[37%] top-7" />
        </div>
        {/* Stripes */}
        <div className="absolute w-full h-3 bg-[#4fc3f7] rounded-full top-1/4 opacity-70" />
        <div className="absolute w-full h-2 bg-[#4fc3f7] rounded-full top-2/4 opacity-70" />
        <div className="absolute w-full h-3 bg-[#4fc3f7] rounded-full top-3/4 opacity-70" />
      </Planet>

      {/* Decorative stars with twinkle animation */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full z-10"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: Math.random() * 200,
            right: Math.random() * 200,
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default PlanetarySystem;
