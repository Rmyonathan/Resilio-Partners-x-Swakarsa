"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Calendar, ExternalLink, Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-blue-400/30 overflow-hidden">
      {/* Animated gradient background with breathing effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-200 to-green-300"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Resilio Partners</h3>
            <p className="text-slate-700 text-sm mb-4 leading-relaxed">
              Strategic consulting firm partnering with growing businesses to build custom platforms, optimize workflows, and deliver complete marketing solutions.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com/company/resilio-partners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 border border-slate-800/20 flex items-center justify-center transition-all duration-300 hover:border-slate-800/40"
              >
                <Linkedin className="w-5 h-5 text-slate-800" />
              </a>
              <a 
                href="https://twitter.com/resiliopartners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 border border-slate-800/20 flex items-center justify-center transition-all duration-300 hover:border-slate-800/40"
              >
                <Twitter className="w-5 h-5 text-slate-800" />
              </a>
              <a 
                href="https://github.com/resilio-partners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 border border-slate-800/20 flex items-center justify-center transition-all duration-300 hover:border-slate-800/40"
              >
                <Github className="w-5 h-5 text-slate-800" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Custom Platform Development
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Workflow Optimization
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Marketing Solutions
                </Link>
              </li>
              <li>
                <Link href="/work-with-us" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Discovery Sprint
                </Link>
              </li>
              <li>
                <Link href="/work-with-us" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                  Project Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-800 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700 text-sm">Email</p>
                  <a href="mailto:contact@resilio-partners.com" className="text-slate-800 hover:text-slate-900 text-sm transition-colors">
                    contact@resilio-partners.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-800 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700 text-sm">Phone</p>
                  <a href="tel:248-496-8798" className="text-slate-800 hover:text-slate-900 text-sm transition-colors">
                    248-496-8798
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-800 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700 text-sm">Book a Call</p>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Discovery Call Booking Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a discovery call to discuss my business needs.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 hover:text-slate-900 text-sm transition-colors flex items-center gap-1"
                  >
                    Schedule Discovery Call
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-700 text-sm">
              © {new Date().getFullYear()} Resilio Partners. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/work-with-us" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/work-with-us" className="text-slate-700 hover:text-slate-900 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
