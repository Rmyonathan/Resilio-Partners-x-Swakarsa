'use client';

import { motion } from 'framer-motion';

export default function BlueOrbit() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: 'transparent' }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* 1. Background Dot Grid */}
        <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" className="text-blue-200 dark:text-blue-900" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotGrid)" opacity="0.4" />

        {/* Center the animation */}
        <g transform="translate(500, 500)">
          
          {/* 2. Inner Pulsing Core */}
          <motion.circle
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-400"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 3. Rotating Half-Curved Arcs */}
          {/* Arc 1: Small, fast, clockwise */}
          <motion.path
            d="M -150, 0 A 150, 150 0 0, 1 150, 0" // Half circle top
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
           <motion.path
            d="M -150, 0 A 150, 150 0 0, 0 150, 0" // Half circle bottom (fainter)
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="10 20"
            className="text-blue-300/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Arc 2: Medium, counter-clockwise, Cyan */}
          <motion.path
            d="M -280, 0 A 280, 280 0 0, 1 0, -280" // Quarter circle
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-cyan-500/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="280"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-100/20 dark:text-blue-800/20"
          />

          {/* Arc 3: Large, slow, thin lines */}
          <motion.path
            d="M -400, 0 A 400, 400 0 0, 1 400, 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-600/30"
            animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          
          {/* 4. Orbiting Dots (Particles) */}
          {[0, 120, 240].map((angle, i) => (
             <motion.g 
               key={i} 
               animate={{ rotate: 360 }} 
               transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: i * 2 }}
             >
                <circle cx="280" cy="0" r="4" className="text-blue-500" fill="currentColor" />
             </motion.g>
          ))}
          
        </g>
        
        {/* Soft Gradient Overlay for depth */}
        <defs>
          <radialGradient id="fadeGradient">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

