"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface AnimatedGridProps {
  isDark?: boolean;
}

const AnimatedGrid = memo(({ isDark = true }: AnimatedGridProps) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div 
      className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-white' : 'bg-black'}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
        backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(to right, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />
    <motion.div
      animate={{ x: [-100, 100, -100], y: [-50, 50, -50], opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]"
      style={{ backgroundColor: 'rgba(0, 166, 81, 0.3)' }}
    />
    <motion.div
      animate={{ x: [100, -100, 100], y: [50, -50, 50], opacity: [0.2, 0.4, 0.2], scale: [1.2, 1, 1.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
      style={{ backgroundColor: 'rgba(0, 84, 166, 0.2)' }}
    />
  </div>
));

AnimatedGrid.displayName = 'AnimatedGrid';

export default function HeroSection() {
  const isDark = true;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden z-10" style={{
      background: 'radial-gradient(ellipse at center, rgba(255, 212, 0, 0.05) 0%, transparent 70%)'
    }}>
        <AnimatedGrid isDark={isDark} />

        <div className="container relative z-10 px-4 sm:px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
             <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm flex items-center gap-2 border-[#0054A6]/30"
                  style={{ backgroundColor: 'rgba(0, 84, 166, 0.1)', color: '#0054A6' }}>
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#0054A6' }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#0054A6' }}></span>
                 </span>
                 Business Consulting & Digital Solutions
             </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">
              AI-Powered Business Solutions <br className="hidden sm:block" />
              That Actually Ship
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-gray-600"
          >
            We partner with growing businesses to build custom platforms, optimize workflows, and deliver complete marketing solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
          >
            <a 
              href="https://calendly.com/resilio-partners/discovery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-white text-black hover:bg-[#00A651]/10 hover:shadow-[0_0_20px_rgba(0,166,81,0.5)] w-full sm:w-auto text-lg flex items-center justify-center gap-2">
                <Calendar size={20} />
                <span className="relative z-10">Book a Discovery Call</span>
              </button>
            </a>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-300 text-gray-700 hover:border-[#0054A6] hover:text-[#0054A6] w-full sm:w-auto text-lg">
                <span className="relative z-10">View Our Work</span>
              </button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
            <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
    </section>
  );
}
