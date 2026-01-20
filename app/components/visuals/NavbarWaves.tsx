'use client';

import { motion } from 'framer-motion';

export default function NavbarWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[10px] w-full z-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full text-blue-200/40"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0V46.29c47,0,115,20,182,18s117-28,210-24s148,24,233,18c122-10,188,14,260,10s167-24,315,22V0H0Z"
          fill="currentColor"
          animate={{
            d: [
              "M0,60 C150,60 150,90 300,90 C450,90 450,60 600,60 C750,60 750,90 900,90 C1050,90 1050,60 1200,60 V120 H0 V60 Z",
              "M0,60 C150,90 150,60 300,60 C450,60 450,90 600,90 C750,90 750,60 900,60 C1050,60 1050,90 1200,90 V120 H0 V60 Z",
              "M0,60 C150,60 150,90 300,90 C450,90 450,60 600,60 C750,60 750,90 900,90 C1050,90 1050,60 1200,60 V120 H0 V60 Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}

