"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProcessBackground() {
  // Color variations for papers
  const paperColors = [
    { bg: 'bg-white', border: 'border-slate-200' },
    { bg: 'bg-blue-50', border: 'border-blue-200' },
    { bg: 'bg-green-50', border: 'border-green-200' },
    { bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { bg: 'bg-purple-50', border: 'border-purple-200' },
    { bg: 'bg-cyan-50', border: 'border-cyan-200' },
    { bg: 'bg-orange-50', border: 'border-orange-200' },
    { bg: 'bg-pink-50', border: 'border-pink-200' },
    { bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { bg: 'bg-amber-50', border: 'border-amber-200' },
    { bg: 'bg-rose-50', border: 'border-rose-200' },
    { bg: 'bg-teal-50', border: 'border-teal-200' },
    { bg: 'bg-violet-50', border: 'border-violet-200' },
    { bg: 'bg-sky-50', border: 'border-sky-200' },
  ];

  // Color variations for people (head colors)
  const peopleColors = [
    { head: 'bg-blue-400', body: 'bg-blue-300' },
    { head: 'bg-green-400', body: 'bg-green-300' },
    { head: 'bg-yellow-400', body: 'bg-yellow-300' },
    { head: 'bg-purple-400', body: 'bg-purple-300' },
    { head: 'bg-cyan-400', body: 'bg-cyan-300' },
    { head: 'bg-orange-400', body: 'bg-orange-300' },
    { head: 'bg-pink-400', body: 'bg-pink-300' },
    { head: 'bg-indigo-400', body: 'bg-indigo-300' },
    { head: 'bg-emerald-400', body: 'bg-emerald-300' },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-50 z-0 pointer-events-none">
      {/* 1. Technical Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
            backgroundImage: 'linear-gradient(#0054A6 1px, transparent 1px), linear-gradient(90deg, #0054A6 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} 
      />

      {/* 2. Abstract "Papers" (Contracts/SOWs) - 15 total */}
      {[...Array(15)].map((_, i) => {
        const colorScheme = paperColors[i % paperColors.length];
        return (
          <motion.div
            key={`paper-${i}`}
            className={`absolute rounded-sm shadow-sm border ${colorScheme.bg} ${colorScheme.border}`}
            style={{
              width: 50 + (i % 3) * 10, // Varied sizes: 50, 60, 70
              height: 70 + (i % 3) * 10, // Varied heights: 70, 80, 90
              top: `${5 + (i % 5) * 18}%`,
              left: `${5 + (i % 6) * 15}%`, // Scattered across width
              rotate: (i % 2 === 0 ? 5 : -5) + (i % 3) * 2, // Varied rotations
            }}
            initial={{ y: 0 }}
            animate={{
              y: [-10, 10, -10],
              rotate: [
                (i % 2 === 0 ? 5 : -5) + (i % 3) * 2,
                (i % 2 === 0 ? 8 : -8) + (i % 3) * 2,
                (i % 2 === 0 ? 5 : -5) + (i % 3) * 2,
              ],
            }}
            transition={{
              duration: 8 + (i % 5), // Varied speeds
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            {/* Mock text lines on paper */}
            <div className="space-y-1 p-2 opacity-20">
              <div className="h-1 bg-slate-400 w-3/4 rounded-full" />
              <div className="h-1 bg-slate-400 w-full rounded-full" />
              <div className="h-1 bg-slate-400 w-1/2 rounded-full" />
              {i % 2 === 0 && <div className="h-1 bg-slate-400 w-5/6 rounded-full" />}
            </div>
          </motion.div>
        );
      })}

      {/* 3. Abstract "People" (Avatars) - 9 total */}
      {[...Array(9)].map((_, i) => {
        const colorScheme = peopleColors[i % peopleColors.length];
        const isRight = i % 2 === 0;
        return (
          <motion.div
            key={`person-${i}`}
            className="absolute flex flex-col items-center opacity-40"
            style={{
              top: `${20 + (i % 3) * 25}%`,
              ...(isRight 
                ? { right: `${10 + (i % 4) * 20}%`, left: 'auto' }
                : { left: `${10 + (i % 4) * 20}%`, right: 'auto' }
              ),
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 10 + (i % 4) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {/* Head */}
            <div className={`w-8 h-8 rounded-full mb-1 ${colorScheme.head}`} />
            {/* Body */}
            <div className={`w-12 h-6 rounded-t-full ${colorScheme.body}`} />
          </motion.div>
        );
      })}

      {/* 4. Geometric Shapes (Process nodes) */}
      {/* Circle Outline */}
      <motion.div
        className="absolute top-[20%] right-[30%] w-24 h-24 rounded-full border-2 border-dashed border-blue-200"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Connector Line */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <motion.path
            d="M 100 100 Q 400 500 800 200"
            fill="none"
            stroke="#0054A6"
            strokeWidth="2"
            strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}