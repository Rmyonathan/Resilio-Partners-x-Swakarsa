"use client";

import { motion } from "framer-motion";
import { memo } from "react";

// Brand Colors
const COLORS = {
  green: "#00A651",
  blue: "#0054A6",
  yellow: "#FFD400",
};

// Orbit Configuration
const ORBITS = [
  {
    radiusX: 280,
    radiusY: 180,
    rotation: 0,
    color: COLORS.green,
    duration: 24,
    electrons: 4,
  },
  {
    radiusX: 320,
    radiusY: 200,
    rotation: 60,
    color: COLORS.blue,
    duration: 28,
    electrons: 5,
  },
  {
    radiusX: 360,
    radiusY: 220,
    rotation: 120,
    color: COLORS.yellow,
    duration: 32,
    electrons: 6,
  },
];

const centerX = 500;
const centerY = 500;

// SVG Filter Definitions
const GlowFilters = memo(() => (
  <defs>
    <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6.5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <filter id="glow-nucleus" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="10" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <radialGradient id="nucleusGradient" cx="50%" cy="50%">
      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
      <stop offset="50%" stopColor="rgba(0, 84, 166, 0.6)" />
      <stop offset="100%" stopColor="rgba(0, 84, 166, 0.2)" />
    </radialGradient>
  </defs>
));

GlowFilters.displayName = "GlowFilters";

// Nucleus Component
const Nucleus = memo(() => (
  <g>
    <motion.circle
      cx={centerX}
      cy={centerY}
      r="28"
      fill="none"
      stroke="rgba(255, 255, 255, 0.5)"
      strokeWidth="2.5"
      opacity={0.6}
      filter="url(#glow-nucleus)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <motion.circle
      cx={centerX}
      cy={centerY}
      r="18"
      fill="url(#nucleusGradient)"
      filter="url(#glow-nucleus)"
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.95, 1, 0.95],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <circle
      cx={centerX}
      cy={centerY}
      r="10"
      fill="rgba(255, 255, 255, 1)"
      filter="url(#glow-nucleus)"
    />
  </g>
));

Nucleus.displayName = "Nucleus";

// Electron Component - Pure SVG animation
interface ElectronProps {
  orbitIndex: number;
  electronIndex: number;
  orbit: typeof ORBITS[0];
}

const Electron = memo(({ orbitIndex, electronIndex, orbit }: ElectronProps) => {
  const phaseOffset = (360 / orbit.electrons) * electronIndex;
  const delay = electronIndex * 0.4;
  
  const getFilterId = () => {
    if (orbit.color === COLORS.green) return "glow-green";
    if (orbit.color === COLORS.blue) return "glow-blue";
    return "glow-yellow";
  };

  // Create elliptical path for animateMotion (full ellipse using two arcs)
  const pathId = `ellipse-path-${orbitIndex}-${electronIndex}`;
  const startX = centerX;
  const startY = centerY - orbit.radiusY;

  return (
    <g transform={`rotate(${orbit.rotation} ${centerX} ${centerY})`}>
      {/* Elliptical path definition - full ellipse */}
      <path
        id={pathId}
        d={`M ${startX} ${startY} A ${orbit.radiusX} ${orbit.radiusY} 0 1 1 ${startX} ${startY + orbit.radiusY * 2} A ${orbit.radiusX} ${orbit.radiusY} 0 1 1 ${startX} ${startY} Z`}
        fill="none"
        stroke="none"
        opacity="0"
      />
      
      {/* Main Electron */}
      <circle r="8" fill={orbit.color} filter={`url(#${getFilterId()})`} opacity="1">
        <animateMotion
          dur={`${orbit.duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="r"
          values="7;9;7"
          dur={`${2 + electronIndex * 0.2}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur={`${1.5 + electronIndex * 0.15}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
      </circle>
      
      {/* Trail Glow */}
      <circle r="16" fill={orbit.color} filter={`url(#${getFilterId()})`} opacity="0.3">
        <animateMotion
          dur={`${orbit.duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0.2;0.4;0.2"
          dur={`${1.5 + electronIndex * 0.15}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
      </circle>
    </g>
  );
});

Electron.displayName = "Electron";

// Orbit Path Component
interface OrbitPathProps {
  orbit: typeof ORBITS[0];
  index: number;
}

const OrbitPath = memo(({ orbit, index }: OrbitPathProps) => {
  const getFilterId = () => {
    if (orbit.color === COLORS.green) return "glow-green";
    if (orbit.color === COLORS.blue) return "glow-blue";
    return "glow-yellow";
  };

  return (
    <ellipse
      cx={centerX}
      cy={centerY}
      rx={orbit.radiusX}
      ry={orbit.radiusY}
      fill="none"
      stroke={orbit.color}
      strokeWidth="2"
      strokeDasharray="8 12"
      opacity="0.4"
      transform={`rotate(${orbit.rotation} ${centerX} ${centerY})`}
      filter={`url(#${getFilterId()})`}
      style={{
        transformOrigin: `${centerX}px ${centerY}px`,
      }}
    />
  );
});

OrbitPath.displayName = "OrbitPath";

// Main Component
export default function AtomBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{
          minWidth: "1000px",
          minHeight: "1000px",
          overflow: "visible",
        }}
      >
        <GlowFilters />

        {ORBITS.map((orbit, index) => (
          <OrbitPath key={`orbit-${index}`} orbit={orbit} index={index} />
        ))}

        {ORBITS.map((orbit, orbitIndex) =>
          Array.from({ length: orbit.electrons }).map((_, electronIndex) => (
            <Electron
              key={`electron-${orbitIndex}-${electronIndex}`}
              orbitIndex={orbitIndex}
              electronIndex={electronIndex}
              orbit={orbit}
            />
          ))
        )}

        <Nucleus />
      </svg>
    </div>
  );
}
