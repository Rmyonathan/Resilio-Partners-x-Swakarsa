'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function CoolStrings() {
  // Generate random paths for the "strings" effect - use useMemo to ensure consistency
  const strings = useMemo(() => {
    // Use a seeded random function for consistent values
    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: i * 0.2,
      duration: 10 + seededRandom() * 10,
      yOffset: seededRandom() * 200,
    }));
  }, []);

  // Generate particles with consistent values
  const particles = useMemo(() => {
    let seed = 54321;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      r: seededRandom() * 3 + 1,
      initialX: seededRandom() * 1440,
      initialY: seededRandom() * 800,
      animateY: seededRandom() * -100,
      duration: seededRandom() * 5 + 5,
      delay: seededRandom() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-900/5">
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="stringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" /> {/* Blue */}
            <stop offset="33%" stopColor="#10B981" stopOpacity="0.6" /> {/* Green */}
            <stop offset="66%" stopColor="#14B8A6" stopOpacity="0.7" /> {/* Tosca/Turquoise */}
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" /> {/* Cyan */}
          </linearGradient>
        </defs>

        {strings.map((str) => (
          <motion.path
            key={str.id}
            fill="none"
            stroke="url(#stringGradient)"
            strokeWidth="4"
            // The "d" path creates a bezier curve that moves
            d={`M-100,${400 + str.yOffset} C400,${300 + str.yOffset} 800,${500 + str.yOffset} 1600,${400 + str.yOffset}`}
            animate={{
              d: [
                `M-100,${400 + str.yOffset} C400,${300 - 50 + str.yOffset} 800,${500 + 50 + str.yOffset} 1600,${400 + str.yOffset}`, // State A
                `M-100,${400 + str.yOffset} C400,${300 + 50 + str.yOffset} 800,${500 - 50 + str.yOffset} 1600,${400 + str.yOffset}`, // State B
                `M-100,${400 + str.yOffset} C400,${300 - 50 + str.yOffset} 800,${500 + 50 + str.yOffset} 1600,${400 + str.yOffset}`, // Back to A
              ],
            }}
            transition={{
              duration: str.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: str.delay,
            }}
          />
        ))}
        
        {/* Floating particles for extra depth */}
        {particles.map((particle) => (
          <motion.circle
            key={`p-${particle.id}`}
            r={particle.r}
            fill="#10B981"
            initial={{ x: particle.initialX, y: particle.initialY, opacity: 0 }}
            animate={{ 
              y: [particle.initialY, particle.initialY + particle.animateY],
              opacity: [0, 0.8, 0] 
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay
            }}
          />
        ))}
      </svg>
    </div>
  );
}

