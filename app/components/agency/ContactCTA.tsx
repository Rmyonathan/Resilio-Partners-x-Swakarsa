"use client";

import { ArrowRight, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/90 border border-[#FFD400]/30 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD400]/5 via-[#0054A6]/5 to-[#00A651]/5 opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help you build custom platforms, optimize workflows, and deliver complete marketing solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-[#FFD400] hover:bg-[#FFD400]/90 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,212,0,0.5)]"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Get in Touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <a
                href="https://calendly.com/resilio-partners/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-2 border-[#0054A6] hover:border-[#00A651] text-white hover:text-[#00A651] font-bold px-8 py-4 rounded-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>Book a Call</span>
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <a
                href="mailto:contact@resilio-partners.com"
                className="flex items-center gap-2 hover:text-[#FFD400] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@resilio-partners.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

