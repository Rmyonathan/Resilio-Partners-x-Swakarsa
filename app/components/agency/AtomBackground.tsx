"use client";

import { motion } from "framer-motion";
import { memo } from "react";

// Main Component - White gradient to blue and gray background
export default function AtomBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100" />
      
      {/* Subtle animated gradient overlay */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 via-transparent to-gray-200/50"
        style={{ willChange: "transform, opacity" }}
      />
      
      {/* Additional subtle animation layer */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 197, 253, 0.2) 50%, transparent 100%)',
          willChange: "transform, opacity" 
        }}
      />
    </div>
  );
}