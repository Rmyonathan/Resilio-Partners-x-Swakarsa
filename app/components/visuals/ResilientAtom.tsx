'use client';

import { motion } from 'framer-motion';

export default function ResilientAtom() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full text-blue-600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Nucleus (Pulsing using Framer Motion) */}
        <motion.circle
          cx="200"
          cy="200"
          r="30"
          fill="currentColor"
          fillOpacity="0.2"
          animate={{ r: [30, 35, 30], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="200" cy="200" r="15" fill="currentColor" />

        {/* Orbit 1 (Horizontal) */}
        <g transform="rotate(0 200 200)">
          <ellipse cx="200" cy="200" rx="160" ry="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
          {/* Use standard <circle> here, NOT <motion.circle> */}
          <circle r="6" fill="#2563EB">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 360,200 A 160,50 0 1,1 40,200 A 160,50 0 1,1 360,200"
            />
          </circle>
        </g>

        {/* Orbit 2 (Rotated 60°) */}
        <g transform="rotate(60 200 200)">
          <ellipse cx="200" cy="200" rx="160" ry="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
          <circle r="6" fill="#0EA5E9">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M 360,200 A 160,50 0 1,1 40,200 A 160,50 0 1,1 360,200"
            />
          </circle>
        </g>

        {/* Orbit 3 (Rotated 120°) */}
        <g transform="rotate(120 200 200)">
          <ellipse cx="200" cy="200" rx="160" ry="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
          <circle r="6" fill="#3B82F6">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M 360,200 A 160,50 0 1,1 40,200 A 160,50 0 1,1 360,200"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
