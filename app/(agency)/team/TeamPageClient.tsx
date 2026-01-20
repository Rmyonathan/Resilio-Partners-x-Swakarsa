"use client";

import { Footer } from "../../components/agency/SectionComponents";
import { Award, Users, Shield, Rocket, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TeamConstellation from "../../components/visuals/TeamConstellation";

export default function TeamPageClient() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Animation */}
      <TeamConstellation />

      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-blue-700">
            Our Team
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Established credibility through proven expertise and hands-on leadership
          </p>
        </motion.div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {/* Jon Irwin */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="bg-white border-4 border-slate-300 hover:border-blue-600 rounded-3xl p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-blue-50 border-2 border-slate-200 flex items-center justify-center mb-6 overflow-hidden">
                    <img 
                      src="/images/jon_irwin.jpg" 
                      alt="Jon Irwin" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">Jon Irwin</h2>
                  <p className="text-lg text-blue-600 font-semibold mb-4">Founder & Principal Consultant</p>
                </div>
                
                <div className="space-y-4 text-slate-600 leading-relaxed mb-6">
                  <p>
                    <strong className="text-slate-900">PMP certified, Air Force veteran</strong> with 20+ years of project management experience across top-tier organizations including Accenture, UAW Trust, and HTC Global.
                  </p>
                  <p>
                    Jon personally scopes every project and ensures delivery excellence. His hands-on approach means you get direct access to leadership, not just a project manager.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">PMP Certified</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">Air Force Veteran</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">20+ Years PM</span>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-slate-200 group-hover:border-blue-200 transition-colors">
                  <p className="text-sm text-slate-500 italic">
                    "I personally scope every project and ensure delivery excellence."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Jethro Lim */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white border-4 border-slate-300 hover:border-blue-600 rounded-3xl p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-blue-50 border-2 border-slate-200 flex items-center justify-center mb-6 overflow-hidden">
                    <img 
                      src="/images/jethro.jpeg" 
                      alt="Jethro Lim" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">Jethro Lim</h2>
                  <p className="text-lg text-blue-600 font-semibold mb-4">Chief Operating Officer</p>
                </div>
                
                <div className="space-y-4 text-slate-600 leading-relaxed mb-6">
                  <p>
                    With <strong className="text-slate-900">2+ years managing development teams</strong>, Jethro oversees all technical delivery and ensures quality across every project.
                  </p>
                  <p>
                    His expertise spans full-stack development, AI/ML integration, and workflow automation. Jethro manages our 20-person engineering team and guarantees quality delivery.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">2+ Years Leadership</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">Technical Delivery</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">Team Manager</span>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-slate-200 group-hover:border-blue-200 transition-colors">
                  <p className="text-sm text-slate-500 italic">
                    "I manage our 20-person engineering team and guarantee quality."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Delivery Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border-4 border-slate-300 hover:border-blue-600 rounded-3xl p-8 md:p-12 text-center shadow-md transition-all duration-300 group"
          >
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-slate-200 flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">Our Delivery Team</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Behind every project is our team of 20+ experienced developers across multiple specialties:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-colors">
                  <Rocket className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-600 font-medium">AI/ML</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-colors">
                  <Shield className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-600 font-medium">Full-Stack</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-colors">
                  <Rocket className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-600 font-medium">Workflow Automation</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-colors">
                  <Award className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-600 font-medium">Web & Marketing</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-8 italic mb-6">
                Individual team members are not listed to protect client confidentiality and team privacy.
              </p>
              <Link
                href="/team/cvs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 transition-all font-semibold"
              >
                <FileText size={18} />
                View All Team CVs
                <ExternalLink size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
