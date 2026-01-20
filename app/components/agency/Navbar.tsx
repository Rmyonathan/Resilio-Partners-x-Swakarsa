"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NavbarWaves from "../visuals/NavbarWaves";
import ContactButtonAnimation from "./ContactButtonAnimation";

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: string;
}

export default function Navbar({ isLoggedIn = false, userRole }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine dashboard link based on role
  const getDashboardLink = () => {
    if (userRole === 'ADMIN') return '/admin';
    if (userRole === 'CONSULTANT') return '/guild';
    if (userRole === 'CLIENT') return '/lab';
    return '/admin';
  };
  
  // Navigation items with their routes
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Team", href: "/team" },
    { label: "About", href: "/about" },
    { label: "Jobs", href: "/jobs" },
    { label: "Blog", href: "/blog" },
    { label: "Franchise", href: "/franchise" },
    { label: "Work With Us", href: "/work-with-us" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className={`w-full rounded-2xl px-6 py-3 transition-all duration-300 backdrop-blur-md border-b border-slate-200 flex justify-between items-center relative
          ${scrolled 
            ? "bg-gradient-to-r from-blue-50 via-blue-100/50 to-blue-50 shadow-md" 
            : isDark 
              ? "bg-blue-50/80" 
              : "bg-blue-50/80 border-slate-200"
          }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/images/resilio-logo.png" 
                alt="Resilio Partners Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`font-bold text-lg tracking-tight ${isDark ? "text-slate-900" : "text-gray-900"}`}>
              Resilio Partners
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className={`flex gap-6 px-6 py-2 rounded-full border ${isDark ? "bg-slate-100 border-slate-200" : "bg-gray-100 border-gray-200"}`}>
                {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 relative group
                    ${isDark ? "text-slate-600" : "text-gray-600"}`}
                >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                ))}
            </div>
            
            <div className="flex items-center gap-3">
                 {isLoggedIn ? (
                   <Link 
                     href={getDashboardLink()}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 border ${
                       isDark 
                         ? "bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700" 
                         : "bg-transparent border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400"
                     }`}
                   >
                      <LayoutDashboard size={18} />
                      Dashboard
                   </Link>
                 ) : (
                   <Link 
                     href="/login" 
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 border ${
                       isDark 
                         ? "bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400" 
                         : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                     }`}
                   >
                      <LogIn size={18} />
                      Login
                   </Link>
                 )}
                 <Link href="/contact" className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                    <ContactButtonAnimation />
                 </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg ${isDark ? "hover:bg-slate-100" : "hover:bg-gray-100"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-slate-900"/> : <Menu size={24} className={isDark ? "text-slate-900" : "text-black"} />}
          </button>

          {/* NavbarWaves Animation (Only show when scrolled) */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 w-full rounded-b-2xl overflow-hidden"
              >
                <NavbarWaves />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
          {mobileMenuOpen && (
          <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden border-t mx-4 mt-2 rounded-2xl
              ${isDark 
                  ? "bg-white/95 backdrop-blur-md border border-slate-200" 
                  : "bg-white/95 border-gray-200"
              }`}
          >
              <div className="px-6 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                  <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium ${isDark ? "text-slate-600" : "text-gray-700"} hover:text-blue-600 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                  >
                  {item.label}
                  </Link>
              ))}
              {isLoggedIn ? (
                <Link
                  href={getDashboardLink()}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-center transition-all duration-300 border ${
                    isDark 
                      ? "bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700" 
                      : "bg-transparent border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-center transition-all duration-300 border ${
                    isDark 
                      ? "bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400" 
                      : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
              <Link
                  href="/contact"
                  className={`px-4 py-2 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center ${isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
              >
                  <ContactButtonAnimation />
              </Link>
              </div>
          </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
}
