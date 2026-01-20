'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

export default function TeamConstellation() {
  const [nodes, setNodes] = useState<{ x: number; y: number; vx: number; vy: number; id: number }[]>([]);

  useEffect(() => {
    // Create nodes with random positions AND velocities
    const newNodes = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100, // % position
      vx: (Math.random() - 0.5) * 0.15, // Velocity X (slow drift)
      vy: (Math.random() - 0.5) * 0.15, // Velocity Y (slow drift)
    }));
    setNodes(newNodes);

    // Animate them - update positions for a "drift" effect
    const interval = setInterval(() => {
      setNodes((prev) => prev.map(node => {
        let newX = node.x + node.vx;
        let newY = node.y + node.vy;

        // Bounce off walls
        if (newX < 0 || newX > 100) {
          return { ...node, x: Math.max(0, Math.min(100, newX)), vx: -node.vx };
        }
        if (newY < 0 || newY > 100) {
          return { ...node, y: Math.max(0, Math.min(100, newY)), vy: -node.vy };
        }

        return { ...node, x: newX, y: newY };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Calculate connections dynamically based on current node positions
  const connections = useMemo(() => {
    const conns: Array<{ from: typeof nodes[0]; to: typeof nodes[0]; distance: number; id: string }> = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode, j) => {
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Connect if close (within 15%)
        if (dist < 15) {
          conns.push({
            from: node,
            to: otherNode,
            distance: dist,
            id: `${i}-${j}`,
          });
        }
      });
    });
    return conns;
  }, [nodes]);

  if (nodes.length === 0) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full text-blue-500" style={{ opacity: 0.4 }}>
        {/* Draw Connections - lines fade based on distance */}
        {connections.map((conn) => {
          const opacity = (1 - (conn.distance / 15)) * 0.8; // Fade out as they get further
          return (
            <line
              key={conn.id}
              x1={`${conn.from.x}%`}
              y1={`${conn.from.y}%`}
              x2={`${conn.to.x}%`}
              y2={`${conn.to.y}%`}
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity={opacity}
            />
          );
        })}

        {/* Draw Nodes - dots that drift */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="5"
            fill="currentColor"
            fillOpacity="0.9"
          />
        ))}
      </svg>
    </div>
  );
}