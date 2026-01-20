"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPreview() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">
              Who We Are
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Resilio Partners is a strategic consulting firm that partners with growing businesses to build custom platforms, optimize workflows, and deliver complete marketing solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We combine deep technical expertise with business strategy to create solutions that actually ship—not just concepts, but real, working systems that drive growth.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 group text-[#FFD400] hover:text-[#00A651] font-semibold text-lg transition-colors"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Visual/Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0054A6]/20 via-[#00A651]/10 to-[#FFD400]/20 border border-[#FFD400]/20 p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-[#0054A6]/30 rounded-2xl p-6 border border-[#0054A6]/40 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#0054A6] mb-2">100+</div>
                  <div className="text-sm text-gray-600">Projects Delivered</div>
                </div>
                <div className="bg-[#00A651]/30 rounded-2xl p-6 border border-[#00A651]/40 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#00A651] mb-2">50+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="bg-[#FFD400]/30 rounded-2xl p-6 border border-[#FFD400]/40 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#FFD400] mb-2">8+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-[#0054A6]/30 to-[#00A651]/30 rounded-2xl p-6 border border-[#0054A6]/40 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

