
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  
  // Using direct color values instead of CSS variables
  const colors = [
    "rgb(125 211 252)", // sky-300
    "rgb(249 168 212)", // pink-300
    "rgb(134 239 172)", // green-300
    "rgb(253 224 71)",  // yellow-300
    "rgb(252 165 165)", // red-300
    "rgb(216 180 254)", // purple-300
    "rgb(147 197 253)", // blue-300
    "rgb(165 180 252)", // indigo-300
    "rgb(196 181 253)", // violet-300
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // State to track which lines are glowing
  const [glowingLines, setGlowingLines] = useState<number[]>([]);
  
  // Effect to animate multiple random lines for better visibility
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Generate 3-5 random lines to glow at once for better visibility
      const numLines = Math.floor(Math.random() * 3) + 3;
      const newGlowingLines = Array.from({ length: numLines }, () => 
        Math.floor(Math.random() * rows.length)
      );
      
      setGlowingLines(newGlowingLines);
      
      // Reset after the animation completes
      setTimeout(() => {
        setGlowingLines([]);
      }, 3000);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [rows.length]);

  return (
    <div
      style={{
        transform: `translate(-40%,-40%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/2 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className={cn(
            "w-16 h-8 border-l relative",
            glowingLines.includes(i) ? "neon-glow-line" : "border-slate-800"
          )}
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className={cn(
                "w-16 h-8 border-r border-t relative",
                glowingLines.includes(i) ? "neon-glow-border" : "border-slate-800"
              )}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={cn(
                    "absolute h-6 w-10 -top-[14px] -left-[22px] stroke-[1px] pointer-events-none",
                    glowingLines.includes(i) ? "text-green-400" : "text-slate-600"
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
