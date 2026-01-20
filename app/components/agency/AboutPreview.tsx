"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ResilientAtom from "../visuals/ResilientAtom";

export default function AboutPreview() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-700">
              Who We Are
            </h2>
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">
              Resilio Partners is a strategic consulting firm that partners with growing businesses to build custom platforms, optimize workflows, and deliver complete marketing solutions.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We combine deep technical expertise with business strategy to create solutions that actually ship—not just concepts, but real, working systems that drive growth.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 group text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* ResilientAtom Animation - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square rounded-3xl bg-gradient-to-br from-blue-50/50 to-blue-100/30 border-2 border-blue-200/50 shadow-md p-8 flex items-center justify-center overflow-hidden"
          >
            <ResilientAtom />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
