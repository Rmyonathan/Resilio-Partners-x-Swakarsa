"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Wave 1 - Slow & Broad */}
        <motion.path
          fill="url(#wave-grad)"
          initial={{ d: "M0,400 C400,200, 800,600, 1200,400 L1200,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,400 C400,200, 800,600, 1200,400 L1200,800 L0,800 Z",
              "M0,400 C400,600, 800,200, 1200,400 L1200,800 L0,800 Z",
              "M0,400 C400,200, 800,600, 1200,400 L1200,800 L0,800 Z",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wave 2 - Faster & Offset */}
        <motion.path
          fill="#60a5fa"
          fillOpacity="0.3"
          initial={{ d: "M0,500 C300,300, 700,700, 1200,500 L1200,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,500 C300,300, 700,700, 1200,500 L1200,800 L0,800 Z",
              "M0,500 C300,700, 700,300, 1200,500 L1200,800 L0,800 Z",
              "M0,500 C300,300, 700,700, 1200,500 L1200,800 L0,800 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}