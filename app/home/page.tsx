"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// Importing Lucide icons
import { 
  Mail, Phone, Globe, Menu, X, ChevronRight, ExternalLink, ArrowRight, 
  Code, Cpu, Layers, Sparkles, ChevronDown 
} from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";

// ================= UTILITY COMPONENTS =================

// Optimize CountUp with useCallback and more efficient requestAnimationFrame
const CountUpAlt = ({ end, suffix = "", duration = 2.5, delay = 0 }: any) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const startAnimation = () => {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, delay]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Simple Card components
const Card = ({ children, className = "", isDark }: any) => (
  <div
    className={`rounded-2xl border ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-gray-200 bg-gray-50'} backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: any) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", variant, size, isDark, onClick }: any) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden group px-6 py-3 rounded-xl font-semibold transition-all duration-300
    ${
      variant === "outline"
        ? isDark 
          ? "border border-slate-600 text-white hover:border-indigo-500 hover:text-indigo-400"
          : "border border-gray-400 text-gray-800 hover:border-indigo-600 hover:text-indigo-600"
        : isDark
          ? "bg-white text-black hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
    }
    ${size === "lg" ? "px-8 py-4 text-lg" : ""}
    ${size === "sm" ? "px-4 py-2 text-sm" : ""}
    ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    {variant !== "outline" && (
      <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-indigo-500/10" />
    )}
  </button>
);

// ================= HERO BACKGROUND COMPONENTS =================

// Memoized to prevent re-renders
const FloatingElement = memo(({ children, delay = 0, xRange = [0, 20, 0], yRange = [0, -20, 0], duration = 5, className = "" }: any) => (
  <motion.div
    animate={{
      x: xRange,
      y: yRange,
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    className={`absolute z-0 ${className}`}
  >
    {children}
  </motion.div>
));

FloatingElement.displayName = 'FloatingElement';

// Memoized to prevent heavy re-renders on parent state changes
const AnimatedGrid = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Pattern */}
      <div 
        className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-white' : 'bg-black'}`}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
          backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(to right, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Moving Light Orbs */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]"
        style={{ willChange: "transform, opacity" }} // Optimization hint
      />
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          opacity: [0.2, 0.4, 0.2],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"
        style={{ willChange: "transform, opacity" }} // Optimization hint
      />
    </div>
  );
});

AnimatedGrid.displayName = 'AnimatedGrid';

// ================= EXISTING COMPONENTS =================

// Optimized Team Member Component
const TeamMember = ({ member, index, isDark }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className={`rounded-2xl p-6 h-full
      ${isDark 
        ? "bg-slate-900/60 border border-slate-800 hover:bg-slate-800/60" 
        : "bg-gray-50 border border-gray-200 shadow-sm hover:bg-white"
      } backdrop-blur-sm transition-colors duration-300`}
  >
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/10">
        <div className={`w-full h-full flex items-center justify-center
          ${isDark ? "bg-slate-800" : "bg-gray-100"}`}>
          <img 
            src={member.image} 
            alt={member.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e: any) => { e.target.src="https://placehold.co/100x100/333/FFF?text=User" }}
          />
        </div>
      </div>
      <div className="min-w-0">
        <h3 className={`text-xl font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
          {member.name}
        </h3>
        <p className={`mt-1 font-medium ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
          {member.role}
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
          {member.description}
        </p>
      </div>
    </div>
  </motion.div>
);

// Optimized Stats Component
const StatsSection = ({ stats, isDark, hasAnimated }: any) => (
  // Added relative and high z-index to ensure it sits above background but below modals
  <section id="stats-section" className="container mx-auto px-6 relative z-20 -mt-20 sm:-mt-24">
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8
      ${isDark 
        ? "bg-slate-900/80 border border-slate-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]" 
        : "bg-white/90 border border-gray-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
      } backdrop-blur-xl rounded-3xl p-8 md:p-10 transform transition-transform hover:scale-[1.01]`}>
      {stats.map((stat: any, index: number) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center group"
        >
          <div className={`text-3xl md:text-5xl font-bold mb-2
            ${isDark 
              ? "bg-gradient-to-r from-indigo-400 to-cyan-400" 
              : "bg-gradient-to-r from-indigo-600 to-cyan-600"
            } bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
            {hasAnimated ? (
              <CountUpAlt 
                end={stat.value} 
                suffix={stat.suffix} 
                duration={2.5} 
                delay={index * 0.2}
              />
            ) : (
              `0${stat.suffix}`
            )}
          </div>
          <p className={`text-xs md:text-sm font-medium uppercase tracking-wider
            ${isDark ? "text-slate-500" : "text-gray-500"}`}>
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

// ================= MODAL COMPONENTS =================
const Modal = ({ isOpen, onClose, children, isDark, title }: any) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className={`relative z-10 w-full max-w-4xl rounded-3xl max-h-[90vh] overflow-hidden flex flex-col
            ${isDark 
              ? "bg-slate-900 border border-slate-700" 
              : "bg-white border border-gray-300"
            } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`sticky top-0 z-20 flex items-center justify-between p-6 border-b backdrop-blur-xl
             ${isDark ? "border-slate-800 bg-slate-900/80" : "border-gray-200 bg-white/80"}`}>
            <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors
                ${isDark 
                  ? "hover:bg-slate-800 text-slate-400 hover:text-white" 
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
                }`}
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Skill Modal Content
const SkillModalContent = ({ skill, isDark }: any) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-5/12">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
          <img 
            src={skill.image} 
            alt={skill.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`mt-4 p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}>
          <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
            Category
          </h4>
          <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            {skill.category}
          </p>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 space-y-4">
        <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {skill.title}
        </h2>
        <p className={`text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
          {skill.description}
        </p>
        
        <div className="pt-4">
          <h4 className={`text-sm font-semibold mb-3 uppercase tracking-wider ${isDark ? "text-slate-400" : "text-gray-500"}`}>
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {skill.techStack.map((tech: string, idx: number) => (
              <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium
                ${isDark 
                  ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20" 
                  : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                }`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className={`h-px w-full ${isDark ? "bg-slate-800" : "bg-gray-200"}`} />

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className={`text-xl font-bold mb-5 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
          <Sparkles size={20} className="text-yellow-500" />
          Key Features
        </h4>
        <div className="space-y-3">
          {skill.features.map((feature: string, idx: number) => (
            <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl transition-colors
              ${isDark ? "hover:bg-slate-800/30" : "hover:bg-gray-50"}`}>
              <div className={`mt-0.5 p-1 rounded-full ${isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"}`}>
                <ChevronRight size={14} />
              </div>
              <p className={`text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-xl font-bold mb-5 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
          <Layers size={20} className="text-indigo-500" />
          Use Cases
        </h4>
        <div className="flex flex-wrap gap-3">
          {skill.useCases.map((useCase: string, idx: number) => (
            <span key={idx} className={`px-4 py-3 rounded-xl text-sm font-medium w-full
              ${isDark 
                ? "bg-slate-800 text-slate-300 border border-slate-700" 
                : "bg-white text-gray-700 border border-gray-200 shadow-sm"
              }`}>
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Portfolio Modal Content
const PortfolioModalContent = ({ project, isDark }: any) => (
  <div className="space-y-8">
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 w-full group">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-8">
             <div>
                <span className={`inline-block px-3 py-1 mb-3 rounded-full text-xs font-semibold backdrop-blur-md
                  ${isDark ? "bg-indigo-500/80 text-white" : "bg-white/90 text-indigo-600"}`}>
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {project.title}
                </h2>
             </div>
        </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Project Overview</h3>
                <p className={`text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  {project.description}
                </p>
            </div>

            <div className="grid gap-6">
                <div className={`p-5 rounded-2xl ${isDark ? "bg-red-500/5 border border-red-500/10" : "bg-red-50 border border-red-100"}`}>
                    <h4 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? "text-red-400" : "text-red-700"}`}>
                        Challenges
                    </h4>
                    <ul className="space-y-2">
                        {project.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                            {challenge}
                        </li>
                        ))}
                    </ul>
                </div>
                
                <div className={`p-5 rounded-2xl ${isDark ? "bg-green-500/5 border border-green-500/10" : "bg-green-50 border border-green-100"}`}>
                    <h4 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? "text-green-400" : "text-green-700"}`}>
                        Solutions
                    </h4>
                    <ul className="space-y-2">
                        {project.solutions.map((solution: string, idx: number) => (
                        <li key={idx} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                            {solution}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="md:col-span-1 space-y-6">
             <div className={`p-5 rounded-2xl ${isDark ? "bg-slate-800/50" : "bg-gray-50 border border-gray-100"}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    Project Details
                </h4>
                <div className="space-y-4">
                    <div>
                        <p className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>Client</p>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{project.client}</p>
                    </div>
                    <div>
                        <p className={`text-xs ${isDark ? "text-slate-500" : "text-gray-400"}`}>Duration</p>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{project.duration}</p>
                    </div>
                </div>
             </div>

             <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    Results
                </h4>
                <div className="space-y-3">
                    {project.results.map((result: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded-xl flex items-center justify-between
                        ${isDark ? "bg-slate-800/30" : "bg-gray-50 border border-gray-100"}`}>
                        <span className={`text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>{result.label}</span>
                        <span className={`font-bold ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>{result.value}</span>
                    </div>
                    ))}
                </div>
             </div>

             <div>
                 <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    Tech Stack
                </h4>
                 <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className={`px-2 py-1 rounded text-xs font-medium
                        ${isDark 
                        ? "bg-slate-800 text-slate-300" 
                        : "bg-gray-100 text-gray-700"
                        }`}>
                        {tech}
                    </span>
                    ))}
                </div>
             </div>
        </div>
    </div>
  </div>
);

// Skill Card
const SkillCard = ({ skill, index, isDark, onClick }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className={`rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col h-full
      ${isDark 
        ? "bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]" 
        : "bg-white border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-xl"
      } transition-all duration-300`}
    onClick={() => onClick(skill)}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={skill.image} 
        alt={skill.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-lg
        ${isDark 
          ? "bg-slate-900/80 text-white border border-slate-700" 
          : "bg-white/90 text-indigo-900 border border-white"
        }`}>
        {skill.category}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className={`font-bold text-xl mb-2 line-clamp-1 group-hover:text-indigo-500 transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
        {skill.title}
      </h3>
      <p className={`text-sm leading-relaxed line-clamp-2 mb-6 flex-grow ${isDark ? "text-slate-400" : "text-gray-600"}`}>
        {skill.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {skill.tags.slice(0, 3).map((tag: string, idx: number) => (
          <span key={idx} className={`px-2.5 py-1 rounded-md text-xs font-medium
            ${isDark 
              ? "bg-slate-800 text-slate-300" 
              : "bg-gray-100 text-gray-600"
            }`}>
            {tag}
          </span>
        ))}
      </div>
      
      <div className={`flex items-center justify-between pt-4 border-t mt-auto
        ${isDark ? "border-slate-800" : "border-gray-100"}`}>
        <span className={`text-sm font-semibold flex items-center gap-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
          Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </motion.div>
);

// Portfolio Card
const PortfolioCard = ({ project, index, isDark, onClick }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className={`rounded-2xl overflow-hidden cursor-pointer group
      ${isDark 
        ? "bg-slate-900/60 border border-slate-800 hover:border-slate-600" 
        : "bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl"
      } transition-all duration-300`}
    onClick={() => onClick(project)}
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
        ${isDark 
          ? "bg-black/60 backdrop-blur-md text-white border border-white/10" 
          : "bg-white/90 backdrop-blur-md text-gray-900 border border-white"
        }`}>
        {project.category}
      </div>

      <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-xl text-white mb-1 truncate">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
             {project.client}
          </p>
      </div>
    </div>

    <div className="p-5">
      <p className={`text-sm line-clamp-2 mb-4 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
        {project.shortDescription}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag: string, idx: number) => (
          <span key={idx} className={`px-2 py-1 rounded text-xs font-medium
            ${isDark 
              ? "bg-slate-800 text-slate-300" 
              : "bg-gray-100 text-gray-700"
            }`}>
            {tag}
          </span>
        ))}
      </div>
      
      <div className={`flex items-center justify-between pt-3 border-t
        ${isDark ? "border-slate-800" : "border-gray-100"}`}>
        <span className={`text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all ${isDark ? "text-white" : "text-gray-900"}`}>
          View Case Study <ArrowRight size={14} className="text-indigo-500" />
        </span>
      </div>
    </div>
  </motion.div>
);

// Client Logos Section
const clientLogos = [
  { name: "CV. ALUMKA CIPTA PRIMA", src: "/trust/cv alumka cipta prima.jpeg" },
  { name: "CV. TAN JAYA STEEL", src: "/trust/cv tan jaya steel.jpeg" },
  { name: "FEIXEN XIAO GROUP", src: "/trust/feixen xiao group.jpeg" },
  { name: "HOTEL DWIPA", src: "/trust/hotel dwipa.jpeg" },
  { name: "MAJU MOBILINDO", src: "/trust/maju mobilindo.jpeg" },
];

const ClientLogosSection = ({ isDark, logos }: any) => (
    <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className={`text-sm font-bold uppercase tracking-widest mb-8 ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                Trusted by Forward-Thinking Companies
            </h2>

            <div className={`flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 px-4`}>
                {logos.map((logo: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        className={`h-8 sm:h-10 md:h-12 w-auto object-contain transition-all duration-300
                            ${isDark ? "opacity-40 hover:opacity-100 brightness-0 invert" : "opacity-50 hover:opacity-100 grayscale hover:grayscale-0"}`}
                        onError={(e: any) => { 
                            e.target.onerror = null; 
                            e.target.src="https://placehold.co/120x60/A0A0A0/FFFFFF?text=Client";
                        }}
                      />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
);

const SocialMediaLogo = ({ social, size = 'w-8 h-8', isDark }: any) => {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        p-0 transition-all duration-300 hover:scale-110 flex-shrink-0
        ${size}
        rounded-full overflow-hidden shadow-sm hover:shadow-md
        ${isDark ? "border border-slate-700 hover:border-indigo-500" : "border border-gray-200 hover:border-indigo-500"}
      `}
      aria-label={social.label}
    >
      <img 
        src={social.src} 
        alt={social.label}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        onError={(e: any) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/32x32/FF0000/FFFFFF?text=S";
        }}
      />
    </a>
  );
};


export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Stats data
  const stats = [
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 95, suffix: "%", label: "Client Satisfaction" },
    { value: 24, suffix: "/7", label: "Support Hours" },
    { value: 3, suffix: "x", label: "Average ROI" },
  ];

  // Team members 
  const teamMembers = [
    {
      name: "M. Jonathan Tanuwijaya",
      role: "CEO & Lead Developer",
      image: "/images/jonathan.jpeg",
      description: "Leading the team with over 5 years of experience in the digital industry. Committed to delivering the best solutions for every client."
    },
    {
      name: "Jethro Elijah Lim",
      role: "Co-Founder & Marketing Director",
      image: "/images/jethro.jpeg",
      description: "Digital strategy expert with a proven track record of increasing online business sales through effective marketing campaigns."
    },
  ];

  // Skills data
  const skills = [
    {
      id: 1,
      title: "Inventory Management",
      category: "Operational System",
      image: "/images/Manajemen Inventori.jpg",
      shortDescription: "Automatic stock recording system with real-time reports for warehouse efficiency.",
      description: "We develop integrated inventory management systems to monitor stock items, in-out flow, and stock demand predictions. This system helps businesses reduce excess stock, prevent shortages, and optimize storage space.",
      features: [
        "Real-time stock recording with barcode/QR code",
        "Automatic alerts for minimum & expired stock",
        "Stock movement analysis reports & forecasting",
        "Integration with POS and e-commerce platforms",
        "Multi-user access with permission control"
      ],
      useCases: [
        "Retail stores with hundreds of SKUs",
        "B2B distributors & suppliers",
        "Manufacturing & production",
        "SMEs with simple stock needs"
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Barcode API"],
      tags: ["Real-time", "Automation", "Reporting", "Barcode"]
    },
    {
      id: 2,
      title: "Accounting & Finance",
      category: "Administrative System",
      image: "/images/Akuntansi & Keuangan.jpg",
      shortDescription: "Modern accounting software for accurate and structured financial recording.",
      description: "Digital accounting system that simplifies transaction recording, invoice management, debt tracking, and financial report generation according to accounting standards.",
      features: [
        "Automatic transaction recording from POS",
        "Invoice & digital tax invoice generation",
        "Profit loss, balance sheet, and cash flow reports",
        "Tax integration (e-Faktur, e-SPT)",
        "Real-time financial dashboard"
      ],
      useCases: [
        "Startups needing simple accounting systems",
        "SMEs with daily transactions",
        "Freelancers needing professional invoices",
        "Companies with multiple revenue streams"
      ],
      techStack: ["React", "Express.js", "MySQL", "Chart.js", "PDF Generator"],
      tags: ["Accounting", "Invoice", "Tax", "Reports"]
    },
    {
      id: 3,
      title: "Point of Sale (POS)",
      category: "Transaction System",
      image: "/images/Point of Sale (POS).jpg",
      shortDescription: "Modern cashier system with various payment methods and stock integration.",
      description: "POS system that supports various types of retail, restaurant, or service-based business transactions with digital payment integration, table management (for F&B), and stock synchronization.",
      features: [
        "Multi-payment methods (QRIS, e-wallet, card)",
        "Split bill & discount management",
        "Integration with kitchen display (for restaurants)",
        "Offline mode & data sync",
        "Customer database & loyalty program"
      ],
      useCases: [
        "Restaurants & cafes with table orders",
        "Retail stores needing fast checkout",
        "Salons & clinics with appointment systems",
        "Stores needing multi-outlet support"
      ],
      techStack: ["Next.js", "Socket.io", "IndexedDB", "Payment Gateway", "Printer API"],
      tags: ["POS", "Payment", "Retail", "F&B"]
    },
    {
      id: 4,
      title: "AI & Machine Learning Integration",
      category: "Artificial Intelligence",
      image: "/images/Integrasi AI & Machine Learning.jpg",
      shortDescription: "AI implementation for predictions, chatbots, and business process automation.",
      description: "Integrating AI and machine learning technology into your system for deeper data analysis, task automation, and improved customer experience.",
      features: [
        "24/7 customer service chatbot",
        "Sales prediction & demand forecasting",
        "Sentiment analysis for reviews & feedback",
        "Image recognition for product QC",
        "Personalized recommendation engine"
      ],
      useCases: [
        "E-commerce with product recommendations",
        "Customer service with chatbots",
        "Manufacturing with AI quality control",
        "Content platforms with personalization"
      ],
      techStack: ["Python", "TensorFlow.js", "OpenAI API", "FastAPI", "Redis"],
      tags: ["AI", "Machine Learning", "Automation", "Chatbot"]
    },
    {
      id: 5,
      title: "Web Scraping & Data Aggregation",
      category: "Data Collection",
      image: "/images/Web Scraping & Data Aggregation.jpg",
      shortDescription: "Automatic data collection from various sources for competitor analysis.",
      description: "Web scraping service that helps you collect product price data, competitor reviews, latest content, or market information automatically from various websites.",
      features: [
        "Scheduled scraping with cron jobs",
        "Proxy rotation to avoid blocking",
        "Automatic data cleaning & formatting",
        "Export to various formats (CSV, JSON, Excel)",
        "API endpoint for direct integration"
      ],
      useCases: [
        "Price monitoring & competitor analysis",
        "Market research & trend analysis",
        "Content aggregation for news portals",
        "Lead generation from directories"
      ],
      techStack: ["Python", "BeautifulSoup", "Scrapy", "Puppeteer", "MongoDB"],
      tags: ["Data", "Scraping", "Automation", "Research"]
    },
    {
      id: 6,
      title: "Business Process Automation",
      category: "Workflow Automation",
      image: "/images/Otomasi Proses Bisnis.jpg",
      shortDescription: "Streamlining business operations with intelligent workflow automation.",
      description: "Automating repetitive business processes like approval systems, notification workflows, document processing, and task management to improve team efficiency.",
      features: [
        "Workflow builder with drag & drop",
        "Multi-level approval system",
        "Automatic notification & reminder",
        "Document generation & e-signature",
        "Integration with existing tools"
      ],
      useCases: [
        "HR process automation (leave, reimbursement)",
        "Sales pipeline & CRM automation",
        "Project management & task assignment",
        "Document approval workflows"
      ],
      techStack: ["Node-RED", "Next.js", "PostgreSQL", "Webhook", "Email API"],
      tags: ["Automation", "Workflow", "Efficiency", "Process"]
    },
    {
      id: 7,
      title: "IoT (Internet of Things)",
      category: "Connectivity & Sensors",
      image: "/images/IoT (Internet of Things).jpg",
      shortDescription: "IoT systems for real-time monitoring, automation, and connected device analytics.",
      description: "Developing Internet of Things solutions that connect physical devices with digital systems for monitoring, automatic control, and real-time data analysis. Our solutions range from simple sensors to integrated enterprise IoT platforms.",
      features: [
        "Real-time device monitoring & remote control",
        "Sensor data collection & analytics dashboard",
        "Predictive maintenance with machine learning",
        "Energy consumption optimization",
        "Multi-protocol support (MQTT, CoAP, HTTP)"
      ],
      useCases: [
        "Smart building & energy management",
        "Industrial IoT for manufacturing",
        "Agriculture monitoring (smart farming)",
        "Asset tracking & logistics",
        "Environmental monitoring (air quality, temperature)"
      ],
      techStack: ["Node.js", "Python", "MQTT", "Grafana", "Raspberry Pi", "Arduino", "AWS IoT"],
      tags: ["IoT", "Sensor", "Real-time", "Monitoring", "Automation"]
    }
  ];

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Maju Mobilindo",
      category: "E-commerce Website",
      client: "Maju Mobilindo - Used Car Dealer",
      image: "/portfolio/Maju Mobilindo.jpeg",
      shortDescription: "E-commerce website for used car dealer with advanced search and filtering system.",
      description: "Developing a comprehensive e-commerce website for used car dealers, focusing on user experience and advanced search systems. This website allows customers to search for cars based on various criteria and schedule test drive appointments online.",
      duration: "8 Weeks",
      challenges: [
        "Managing 500+ car catalog with different specifications",
        "Creating responsive and accurate search systems",
        "Integration with CRM systems for lead management",
        "Performance optimization for many images"
      ],
      solutions: [
        "Implementing search engine with advanced filters",
        "CDN for image loading optimization",
        "Chatbot for 24/7 customer service",
        "Admin dashboard for inventory management"
      ],
      results: [
        { value: "300%", label: "Traffic Increase" },
        { value: "45%", label: "Conversion Rate" },
        { value: "2.5x", label: "Lead Generation" }
      ],
      techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Cloudinary", "Stripe"],
      tags: ["E-commerce", "Automotive", "Search", "Booking"]
    },
    {
      id: 2,
      title: "Alumka Lampung",
      category: "Company Profile",
      client: "PT Alumka Lampung - Building Materials Supplier",
      image: "/portfolio/Alumka.jpeg",
      shortDescription: "Company profile website with product catalog and integrated inquiry system.",
      description: "Creating a professional company profile website for building materials suppliers, displaying project portfolios, complete product catalogs, and inquiry systems integrated with WhatsApp Business API for quick customer response.",
      duration: "6 Weeks",
      challenges: [
        "Displaying product catalog with 1000+ items",
        "Integration with WhatsApp Business API",
        "Optimization for mobile users (70% traffic)",
        "Multi-language support for international markets"
      ],
      solutions: [
        "Dynamic catalog with categories and filters",
        "WhatsApp integration for instant inquiry",
        "Mobile-first responsive design",
        "i18n for English and Indonesian language support"
      ],
      results: [
        { value: "200+", label: "Monthly Inquiries" },
        { value: "60%", label: "Mobile Traffic" },
        { value: "40%", label: "Increase in Sales" }
      ],
      techStack: ["React", "TypeScript", "Node.js", "MongoDB", "WhatsApp API"],
      tags: ["Company Profile", "Catalog", "WhatsApp", "B2B"]
    },
    {
      id: 3,
      title: "AI FAQ System",
      category: "AI Solution",
      client: "Tech Startup Company",
      image: "/portfolio/AI FAQ System.jpeg",
      shortDescription: "AI-based FAQ system with natural language processing for customer support.",
      description: "Developing intelligent FAQ systems using machine learning to understand customer questions and provide relevant answers. This system reduces customer service workload by 70% with accurate response automation.",
      duration: "10 Weeks",
      challenges: [
        "Training models to understand various question types",
        "Integration with existing helpdesk systems",
        "Handling ambiguous questions",
        "Multi-language understanding"
      ],
      solutions: [
        "Fine-tuning GPT models for specific domains",
        "API integration with Zendesk & Freshdesk",
        "Confidence scoring for ambiguous questions",
        "Fallback to human agents when needed"
      ],
      results: [
        { value: "70%", label: "Reduction in Support Tickets" },
        { value: "4.5/5", label: "Customer Satisfaction" },
        { value: "24/7", label: "Availability" }
      ],
      techStack: ["Python", "FastAPI", "OpenAI", "React", "Redis"],
      tags: ["AI", "Chatbot", "NLP", "Automation"]
    }
  ];

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setHasAnimated(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: "50px"
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection && observerRef.current) {
      observerRef.current.observe(statsSection);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedSkill(null);
    setSelectedProject(null);
  };
   
  const socialMediaLinks = [
    { icon: 'Instagram', href: "https://www.instagram.com/swakarsa_digital", label: "Instagram", src: "/sosmed/instagram.jpeg" },
    { icon: 'Facebook', href: "https://www.facebook.com/share/1B4CzChc4e", label: "Facebook", src: "/sosmed/facebook.png" },
    { icon: 'X', href: "https://x.com/swakarsadigital", label: "X (Twitter)", src: "/sosmed/x.png" },
    { icon: 'Linkedin', href: "https://www.linkedin.com/in/swakarsa-digital-65a651379", label: "LinkedIn", src: "/sosmed/linkedIn.png" },
    { icon: 'GitHub', href: "https://github.com/rmyonathan", label: "GitHub", src: "/sosmed/github.png" },
  ];

  const menuItems = ["Home", "Portfolio", "Services", "Team", "Contact"];

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"} overflow-x-hidden transition-colors duration-500`}>
      
      {/* ================= NAVBAR ================= */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isDark 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5" 
          : "bg-white/90 backdrop-blur-xl border-b border-gray-200/50"
        }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/images/logo.jpeg" 
                alt="Swakarsa Digital Logo" 
                className="w-full h-full object-cover"
                loading="eager" // Logo should load immediately
              />
            </div>
            
            <span className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Swakarsa Digital
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className={`flex gap-6 px-6 py-2 rounded-full border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}>
                {menuItems.map((item) => (
                <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors hover:text-indigo-500 relative group
                    ${isDark ? "text-slate-300" : "text-gray-600"}`}
                >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                ))}
            </div>
            
            <div className="flex items-center gap-3">
                {/* Dark/Light Mode Toggle */}
                <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-all duration-300 hover:rotate-12
                    ${isDark 
                    ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" 
                    : "bg-gray-200 text-slate-700 hover:bg-gray-300"
                    }`}
                >
                {isDark ? "☀️" : "🌙"}
                </button>
                
                <a href="#contact">
                    <Button size="sm" isDark={isDark} className={isDark ? "bg-white text-black" : "bg-black text-white"}>
                        Let's Talk
                    </Button>
                </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg ${isDark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
            {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden overflow-hidden border-t
                ${isDark 
                    ? "bg-black/95 border-white/10" 
                    : "bg-white/95 border-gray-200"
                }`}
            >
                <div className="px-6 py-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                    <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-lg font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    {item}
                    </a>
                ))}
                <div className="h-px w-full bg-white/10 my-2"></div>
                <div className="flex items-center justify-between">
                    <span className={isDark ? "text-slate-400" : "text-gray-600"}>Theme</span>
                    <button
                    onClick={() => setIsDark(!isDark)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium
                        ${isDark ? "bg-slate-800 text-white" : "bg-gray-200 text-gray-900"}`}
                    >
                    {isDark ? "Switch to Light" : "Switch to Dark"}
                    </button>
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </nav>

      {/* ================= NEW HERO SECTION ================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden z-10">
        {/* Dynamic Background z-0 */}
        <AnimatedGrid isDark={isDark} />
        
        {/* Floating Background Icons z-0 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
             <FloatingElement delay={0} xRange={[-50, 50, -50]} yRange={[-20, 20, -20]} duration={12} className="top-[15%] left-[10%] opacity-20">
                 <Code size={64} className={isDark ? "text-indigo-400" : "text-indigo-600"} />
             </FloatingElement>
             <FloatingElement delay={2} xRange={[50, -50, 50]} yRange={[30, -30, 30]} duration={15} className="bottom-[20%] right-[10%] opacity-20">
                 <Cpu size={80} className={isDark ? "text-cyan-400" : "text-cyan-600"} />
             </FloatingElement>
             <FloatingElement delay={1} xRange={[-30, 30, -30]} yRange={[50, -50, 50]} duration={18} className="top-[40%] right-[20%] opacity-10">
                 <Globe size={120} className={isDark ? "text-purple-400" : "text-purple-600"} />
             </FloatingElement>
             <FloatingElement delay={3} xRange={[20, -20, 20]} yRange={[-40, 40, -40]} duration={14} className="bottom-[15%] left-[20%] opacity-15">
                 <Layers size={50} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
             </FloatingElement>
        </div>

        {/* Hero Content z-10 */}
        <div className="container relative z-10 px-4 sm:px-6 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
             <div className={`px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm flex items-center gap-2
                 ${isDark 
                    ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" 
                    : "bg-indigo-50 border-indigo-200 text-indigo-700"
                 }`}>
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                 </span>
                 Digital Agency & Freelancer Collective
             </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8
              ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Swakarsa <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-gradient-x">
              Digital
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed
              ${isDark ? "text-slate-400" : "text-gray-600"}`}
          >
            We help businesses build websites, systems, and digital strategies designed to enhance
            <span className={`font-semibold mx-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              credibility
            </span>, 
            <span className={`font-semibold mx-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              generate leads
            </span>, and 
            <span className={`font-semibold mx-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              increase sales
            </span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
          >
            <a href="/portfolio" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-500/25" isDark={isDark}>
                View Our Work <ChevronRight size={20} />
              </Button>
            </a>
            <a href="/team" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" isDark={isDark}>
                Meet the Team
              </Button>
            </a>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
            <ChevronDown size={32} className={isDark ? "text-slate-500" : "text-gray-400"} />
        </motion.div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <StatsSection stats={stats} isDark={isDark} hasAnimated={hasAnimated} />

      {/* ================= ABOUT ================= */}
      <section id="about" className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              More Than Just a <br />
              <span className="text-indigo-500">Digital Agency</span>
            </h2>
            <div className={`space-y-6 text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                <p>
                Swakarsa Digital is a collective of freelancers consisting of
                web developers, digital marketers, and creative strategists.
                We work as one team to help brands and SMEs
                build modern, scalable digital presence ready to compete.
                </p>
                <p>
                Our mission is to empower businesses with effective digital solutions
                that drive growth, enhance credibility, and maximize ROI. We believe
                in transparency, collaboration, and delivering measurable results.
                </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
                <div className={`p-4 rounded-xl border ${isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-gray-50"}`}>
                    <h3 className="font-bold text-2xl text-indigo-500 mb-1">5+</h3>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>Years Experience</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-gray-50"}`}>
                    <h3 className="font-bold text-2xl text-cyan-500 mb-1">100%</h3>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>Commitment</p>
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
             <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-30 ${isDark ? "bg-indigo-500" : "bg-indigo-300"}`}></div>
             <Card isDark={isDark} className="relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-bl-full`}></div>
                <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}>
                            <Globe size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Websites & Systems</h4>
                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>Custom web apps, landing pages, and complex management systems.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"}`}>
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Digital Marketing</h4>
                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>SEO, Ads, and social media strategies to boost your online presence.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-100 text-cyan-600"}`}>
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Tech Consultation</h4>
                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>Expert advice on the right technology stack for your business growth.</p>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section id="team" className={`py-20 sm:py-32 ${isDark ? "bg-slate-900/30" : "bg-gray-100/50"}`}>
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Meet Our Leadership
                </h2>
                <p className={`text-lg ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                The creative minds and technical experts behind Swakarsa Digital.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
                <TeamMember 
                key={member.name} 
                member={member} 
                index={index} 
                isDark={isDark} 
                />
            ))}
            </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="services" className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Core Capabilities
            </h2>
            <p className={`text-lg ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                End-to-end digital services for modern business needs. We combine technical expertise with creative strategy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard 
                key={skill.id}
                skill={skill}
                index={index}
                isDark={isDark}
                onClick={handleSkillClick}
              />
            ))}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mt-16 p-8 rounded-3xl relative overflow-hidden
              ${isDark 
                ? "bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700" 
                : "bg-white border border-gray-200 shadow-xl"
              }`}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <span className="text-white text-2xl font-bold">All-in</span>
                </div>
              </div>
              <div>
                <h3 className={`font-bold text-2xl mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Complete Solutions in One Platform
                </h3>
                <p className={`text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  We don't just build websites; we build ecosystems. From initial concept to deployment and marketing, 
                  we ensure every part of your digital presence works together seamlessly.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= PORTFOLIO ================= */}
      <section id="portfolio" className={`py-20 sm:py-32 ${isDark ? "bg-black" : "bg-gray-50"}`}>
         <div className="container mx-auto px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Featured Work
                        </h2>
                        <p className={`text-lg ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                        A selection of our recent projects that showcase our commitment to quality and innovation.
                        </p>
                    </div>
                    <a href="/portfolio">
                        <Button variant="outline" isDark={isDark} className="whitespace-nowrap">
                            View All Projects
                        </Button>
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                {portfolioItems.map((project, index) => (
                    <PortfolioCard 
                    key={project.id}
                    project={project}
                    index={index}
                    isDark={isDark}
                    onClick={handleProjectClick}
                    />
                ))}
                </div>

                {/* Portfolio CTA */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`mt-16 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden group
                    ${isDark 
                    ? "bg-indigo-900/20 border border-indigo-500/30" 
                    : "bg-indigo-50 border border-indigo-100"
                    }`}
                >
                    <div className={`absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]`}></div>
                    <div className="relative z-10">
                        <h3 className={`font-bold text-2xl md:text-3xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Have a project in mind?
                        </h3>
                        <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                        Let's discuss how we can help you achieve your goals. We're always excited to take on new challenges.
                        </p>
                        <a href="#contact">
                            <Button size="lg" isDark={isDark} className="shadow-xl">
                                Start a Conversation
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* ================= CLIENT LOGOS ================= */}
      <ClientLogosSection isDark={isDark} logos={clientLogos} />

      {/* ================= CTA & FOOTER ================= */}
      <footer className={`relative pt-24 pb-12 overflow-hidden
        ${isDark 
          ? "bg-slate-900 border-t border-slate-800" 
          : "bg-white border-t border-gray-200"
        }`}>
        
        {/* CTA Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20" id="contact">
                <h2 className={`text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Ready to Level Up?
                </h2>
                <p className={`text-xl mb-10 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                Consult your website & marketing needs with the Swakarsa Digital team.
                Get a free consultation to discuss your project requirements.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" className="shadow-2xl shadow-indigo-500/40" isDark={isDark}>
                        <a href="https://wa.me/6282279513201" className="flex items-center gap-2">
                             Book Free Consultation
                        </a>
                    </Button>
                    <Button size="lg" variant="outline" isDark={isDark}>
                        <a href="mailto:swakarsadigital@gmail.com" className="flex items-center gap-2">
                             Send Email
                        </a>
                    </Button>
                </div>

                 {/* Social Media */}
                <div className="mt-12">
                    <p className={`text-sm font-semibold uppercase tracking-widest mb-6 ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                        Follow Our Journey
                    </p>
                    <div className="flex justify-center gap-6">
                        {socialMediaLinks.map((social, idx) => (
                        <SocialMediaLogo 
                            key={idx} 
                            social={social} 
                            isDark={isDark} 
                            size="w-10 h-10 md:w-12 md:h-12"
                        />
                        ))}
                    </div>
                </div>
            </div>

            <div className={`h-px w-full my-12 ${isDark ? "bg-slate-800" : "bg-gray-200"}`}></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <a href="/" className="flex items-center gap-3">
                    <img src="/images/logo.jpeg" alt="Logo" className="w-8 h-8 rounded-lg" />
                    <span className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                        Swakarsa Digital
                    </span>
                </a>
                
                <p className={`text-sm ${isDark ? "text-slate-500" : "text-gray-500"}`}>
                    © {new Date().getFullYear()} Swakarsa Digital. All Rights Reserved.
                </p>

                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className={`hover:text-indigo-500 transition-colors ${isDark ? "text-slate-400" : "text-gray-600"}`}>Privacy Policy</a>
                    <a href="#" className={`hover:text-indigo-500 transition-colors ${isDark ? "text-slate-400" : "text-gray-600"}`}>Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={closeModal}
        isDark={isDark}
        title={selectedSkill?.title}
      >
        {selectedSkill && <SkillModalContent skill={selectedSkill} isDark={isDark} />}
      </Modal>

      <Modal
        isOpen={!!selectedProject}
        onClose={closeModal}
        isDark={isDark}
        title={selectedProject?.title}
      >
        {selectedProject && <PortfolioModalContent project={selectedProject} isDark={isDark} />}
      </Modal>
    </div>
  );
}