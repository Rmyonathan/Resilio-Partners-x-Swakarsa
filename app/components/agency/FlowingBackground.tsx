// app/components/agency/FlowingBackground.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FlowingBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        {/* Blob 1 - Resilio Blue */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[80px] bg-[#0054A6]"
          style={{ opacity: 0.5 }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Resilio Green */}
        <motion.div
          className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full mix-blend-multiply filter blur-[80px] bg-[#00A651]"
          style={{ opacity: 0.5 }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Blob 3 - Resilio Yellow */}
        <motion.div
          className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] bg-[#FFD400]"
          style={{ opacity: 0.6 }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Subtle Grid Texture for Professional Look */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
            backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
}