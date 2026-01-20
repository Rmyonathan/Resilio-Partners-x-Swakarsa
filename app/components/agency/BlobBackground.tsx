"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlobBackground() {
  return (
    // // CHANGE: Added absolute positioning and negative z-index to sit behind text
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* // CHANGE: Simple background layer */}
      <div className="absolute inset-0 bg-slate-50/50" />
      
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* // CHANGE: Motion circles animate smoothly without CSS repaints */}
        <motion.circle
          cx="20"
          cy="20"
          r="20"
          fill="url(#grad1)"
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 20, 10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="80"
          cy="80"
          r="25"
          fill="url(#grad2)"
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, -20, -10, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>
      
      {/* // CHANGE: Backdrop blur overlay to create the 'gooey' effect smoothly */}
      <div className="absolute inset-0 backdrop-blur-[80px]" />
    </div>
  );
}
