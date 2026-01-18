"use client";

import { motion } from "framer-motion";
import { memo } from "react";

// Brand Colors
const BRAND_COLORS = {
  green: "#00A651",
  blue: "#0054A6",
  yellow: "#FFD400",
};

// Orbit Configuration
interface OrbitConfig {
  radius: number;
  duration: number;
  direction: number; // 1 or -1 for rotation direction
  color: string;
  particleCount: number;
  particleSize: number;
}

const ORBITS: OrbitConfig[] = [
  {
    radius: 200,
    duration: 20,
    direction: 1,
    color: BRAND_COLORS.green,
    particleCount: 3,
    particleSize: 8,
  },
  {
    radius: 300,
    duration: 25,
    direction: -1,
    color: BRAND_COLORS.blue,
    particleCount: 4,
    particleSize: 6,
  },
  {
    radius: 400,
    duration: 30,
    direction: 1,
    color: BRAND_COLORS.yellow,
    particleCount: 5,
    particleSize: 5,
  },
];

// Central Nucleus Component
const Nucleus = memo(() => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
    style={{
      background: `radial-gradient(circle, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))`,
      boxShadow: `0 0 40px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)`,
    }}
  >
    {/* Inner glow */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 70%)`,
      }}
    />
  </motion.div>
));

Nucleus.displayName = "Nucleus";

// Electron Particle Component
interface ElectronProps {
  orbitIndex: number;
  particleIndex: number;
  orbit: OrbitConfig;
}

const Electron = memo(({ orbitIndex, particleIndex, orbit }: ElectronProps) => {
  const angle = (360 / orbit.particleCount) * particleIndex;
  const radius = orbit.radius;

  return (
    <motion.g
      transform={`rotate(${angle})`}
      animate={{
        rotate: [0, orbit.direction * 360],
      }}
      transition={{
        duration: orbit.duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ transformOrigin: "50% 50%" }}
    >
      <motion.circle
        cx={radius}
        cy={0}
        r={orbit.particleSize}
        fill={orbit.color}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2 + particleIndex * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particleIndex * 0.2,
        }}
        style={{
          filter: `drop-shadow(0 0 ${orbit.particleSize}px ${orbit.color})`,
        }}
      />
      {/* Glow trail */}
      <motion.circle
        cx={radius}
        cy={0}
        r={orbit.particleSize * 1.5}
        fill={orbit.color}
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2 + particleIndex * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particleIndex * 0.2,
        }}
        style={{
          filter: `blur(4px)`,
        }}
      />
    </motion.g>
  );
});

Electron.displayName = "Electron";

// Orbit Path Component (SVG Ellipse)
interface OrbitPathProps {
  radius: number;
  color: string;
  opacity?: number;
}

const OrbitPath = memo(({ radius, color, opacity = 0.1 }: OrbitPathProps) => (
  <ellipse
    cx="50%"
    cy="50%"
    rx={radius}
    ry={radius * 0.6} // Slightly flattened for perspective
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeDasharray="4 4"
    opacity={opacity}
  />
));

OrbitPath.displayName = "OrbitPath";

// Main Atom Background Component
export default function AtomBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8), rgba(2, 6, 23, 0.95), rgba(0, 0, 0, 1))`,
        }}
      />

      {/* SVG Container for Atom Visualization */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        {/* Orbit Paths (subtle guides) */}
        {ORBITS.map((orbit, index) => (
          <OrbitPath
            key={`orbit-${index}`}
            radius={orbit.radius}
            color={orbit.color}
            opacity={0.08}
          />
        ))}

        {/* Orbiting Electrons */}
        {ORBITS.map((orbit, orbitIndex) =>
          Array.from({ length: orbit.particleCount }).map((_, particleIndex) => (
            <Electron
              key={`electron-${orbitIndex}-${particleIndex}`}
              orbitIndex={orbitIndex}
              particleIndex={particleIndex}
              orbit={orbit}
            />
          ))
        )}
      </svg>

      {/* Central Nucleus (HTML/CSS for better control) */}
      <Nucleus />

      {/* Ambient glow layers */}
      {ORBITS.map((orbit, index) => (
        <motion.div
          key={`glow-${index}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            width: orbit.radius * 2.5,
            height: orbit.radius * 2.5,
            background: `radial-gradient(circle, ${orbit.color}15, transparent 70%)`,
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 1.5,
          }}
        />
      ))}
    </div>
  );
}

