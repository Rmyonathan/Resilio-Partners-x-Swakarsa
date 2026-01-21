"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import CoolStrings from "../visuals/CoolStrings";

export default function HeroSection() {
  const [wavesAnimation, setWavesAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/Waves.json')
      .then(res => res.json())
      .then(data => setWavesAnimation(data))
      .catch(err => console.error('Failed to load waves animation:', err));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-0 overflow-hidden z-10 bg-white">
        {/* Cool Strings Animation */}
        <CoolStrings />
        
        <div className="container relative z-10 px-4 sm:px-6 text-center max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
             <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-600 bg-blue-50 text-blue-600 flex items-center gap-2">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-600"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                 </span>
                 Business Consulting & Digital Solutions
             </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900"
          >
            AI-Powered Business Solutions <br className="hidden sm:block" />
            That Actually Ship
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-slate-600"
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
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Discovery Call Booking Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a discovery call to discuss my business needs.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-lg flex items-center justify-center gap-2">
                <Calendar size={20} />
                <span className="relative z-10">Book a Discovery Call</span>
              </button>
            </a>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <button className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-slate-300 hover:border-blue-500 text-slate-700 w-full sm:w-auto text-lg">
                <span className="relative z-10">View Our Work</span>
              </button>
            </Link>
          </motion.div>
        </div>
        
        {/* Waves Animation at Bottom */}
        {wavesAnimation && (
          <div className="absolute bottom-0 left-0 right-0 z-0" style={{ height: '200px' }}>
            <Lottie 
              animationData={wavesAnimation} 
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10"
        >
            <ChevronDown size={32} className="text-slate-400" />
        </motion.div>
    </section>
  );
}
