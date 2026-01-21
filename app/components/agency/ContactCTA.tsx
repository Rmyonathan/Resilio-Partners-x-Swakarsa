"use client";

import { ArrowRight, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CallCenterSupportAnimation from "./CallCenterSupportAnimation";

export default function ContactCTA() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Animation */}
            <div className="hidden md:block relative h-full min-h-[400px] bg-slate-50">
              <CallCenterSupportAnimation />
            </div>

            {/* Right Side - Content */}
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Let's discuss how we can help you build custom platforms, optimize workflows, and deliver complete marketing solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Get in Touch</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Discovery Call Booking Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a discovery call to discuss my business needs.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-slate-300 hover:border-blue-500 text-slate-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>Book a Call</span>
                </a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600">
                <a
                  href="mailto:contact@resilio-partners.com"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">contact@resilio-partners.com</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

