"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GeometricBackground() {
  const [shapes, setShapes] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);
  const [mounted, setMounted] = useState(false);

  // Generate shapes only on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const generatedShapes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setShapes(generatedShapes);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-slate-50/50" />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-slate-50/50">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ opacity: 0.4 }}>
        {shapes.map((shape) => (
          <motion.rect
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.size}
            height={shape.size}
            rx="10"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeOpacity="0.4"
            initial={{ rotate: 0, scale: 1, opacity: 0.2 }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear",
              delay: shape.delay,
            }}
            style={{
              transformOrigin: "center",
            }}
          />
        ))}
        {/* Dotted Grid Overlay */}
        <pattern
          id="dot-pattern-geometric"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#cbd5e1" />
        </pattern>
        <rect width="100" height="100" fill="url(#dot-pattern-geometric)" opacity="0.4" />
      </svg>
    </div>
  );
}