"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlueprintBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-50 z-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        {/* Gold Wave Flowing from Top to Bottom */}
        <motion.path
          d="M 0,0 Q 300,200 600,400 T 1200,800 L 1200,1200 L 0,1200 Z"
          fill="none"
          stroke="#FFD400"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{
            pathLength: 1,
            opacity: [0.4, 0.6, 0.4],
            d: [
              "M 0,0 Q 300,200 600,400 T 1200,800 L 1200,1200 L 0,1200 Z",
              "M 0,0 Q 400,250 600,450 T 1200,800 L 1200,1200 L 0,1200 Z",
              "M 0,0 Q 200,150 600,350 T 1200,800 L 1200,1200 L 0,1200 Z",
              "M 0,0 Q 300,200 600,400 T 1200,800 L 1200,1200 L 0,1200 Z",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Additional flowing wave for depth */}
        <motion.path
          d="M 0,100 Q 350,300 600,500 T 1200,900 L 1200,1200 L 0,1200 Z"
          fill="none"
          stroke="#FFD400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.5, 0.3],
            d: [
              "M 0,100 Q 350,300 600,500 T 1200,900 L 1200,1200 L 0,1200 Z",
              "M 0,100 Q 450,350 600,550 T 1200,900 L 1200,1200 L 0,1200 Z",
              "M 0,100 Q 250,250 600,450 T 1200,900 L 1200,1200 L 0,1200 Z",
              "M 0,100 Q 350,300 600,500 T 1200,900 L 1200,1200 L 0,1200 Z",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Gold Wave Flowing from Right to Left - First Wave */}
        <motion.path
          d="M 1200,0 Q 900,150 600,300 T 0,600 L -200,600 L -200,0 Z"
          fill="none"
          stroke="#FFD400"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{
            pathLength: 1,
            opacity: [0.4, 0.6, 0.4],
            d: [
              "M 1200,0 Q 900,150 600,300 T 0,600 L -200,600 L -200,0 Z",
              "M 1200,0 Q 800,200 600,350 T 0,600 L -200,600 L -200,0 Z",
              "M 1200,0 Q 1000,100 600,250 T 0,600 L -200,600 L -200,0 Z",
              "M 1200,0 Q 900,150 600,300 T 0,600 L -200,600 L -200,0 Z",
            ]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Gold Wave Flowing from Right to Left - Second Wave */}
        <motion.path
          d="M 1200,200 Q 850,350 600,500 T 0,800 L -200,800 L -200,200 Z"
          fill="none"
          stroke="#FFD400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.5, 0.3],
            d: [
              "M 1200,200 Q 850,350 600,500 T 0,800 L -200,800 L -200,200 Z",
              "M 1200,200 Q 750,450 600,550 T 0,800 L -200,800 L -200,200 Z",
              "M 1200,200 Q 950,250 600,450 T 0,800 L -200,800 L -200,200 Z",
              "M 1200,200 Q 850,350 600,500 T 0,800 L -200,800 L -200,200 Z",
            ]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </svg>
    </div>
  );
}