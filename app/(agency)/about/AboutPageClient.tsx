"use client";

import { Footer } from "../../components/agency/SectionComponents";
import { Sparkles, Target, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import ResilientAtom from "../../components/visuals/ResilientAtom";

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center relative">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-blue-700 relative z-10">
          About Resilio Partners
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto relative z-10">
          Our origin story, mission, and why businesses trust us to deliver
        </p>
      </section>

      {/* Origin Story */}
      <section className="py-16 pb-24 relative">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 mb-12 shadow-md relative">
            {/* ResilientAtom Animation Background */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20 z-0 pointer-events-none">
              <ResilientAtom />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-slate-200 flex items-center justify-center mb-6">
                <Sparkles className="text-blue-600" size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Origin Story</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Resilio Partners was founded by <strong className="text-slate-900">Jon Irwin</strong> after 20+ years in project management with leading organizations like Accenture, UAW Trust, and HTC Global. After years of helping Fortune 500 companies deliver complex projects, Jon found himself in the job market—and discovered a gap in the resume optimization space.
                </p>
                <p>
                  That gap led to <Link href="/portfolio" className="text-blue-600 hover:text-blue-700 underline">OneClick Smart Resume</Link>—an AI-powered platform built during his own job search journey. What started as solving a personal problem became proof that complex, AI-driven platforms could be built quickly and effectively.
                </p>
                <p>
                  Today, Resilio Partners helps growing businesses build custom platforms, optimize workflows, and deliver complete marketing solutions. We combine Jon's proven project management expertise with Jethro's 2+ years of technical leadership and a 20-person engineering team to deliver solutions that actually ship.
                </p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:border-blue-500">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To help growing businesses build custom platforms and marketing solutions that drive real results, backed by proven delivery methodology and hands-on leadership.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:border-blue-500">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Why Trust Us</h3>
              <p className="text-slate-600 leading-relaxed">
                Every project is personally scoped by Jon and delivered with quality guaranteed by Jethro. We combine 22+ combined years of experience with a proven track record of shipping.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:border-blue-500">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Rocket className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Promise</h3>
              <p className="text-slate-600 leading-relaxed">
                We don't just build—we deliver. Every project includes a 90-day optimization period to ensure maximum ROI and seamless integration with your business.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-md">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Hands-On Leadership</h4>
                    <p className="text-slate-600 text-sm">Direct access to leadership, not just project managers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Proven Delivery</h4>
                    <p className="text-slate-600 text-sm">22+ years combined experience with a track record of shipping</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Quality Guaranteed</h4>
                    <p className="text-slate-600 text-sm">Technical leadership ensures every project meets the highest standards</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Transparent Process</h4>
                    <p className="text-slate-600 text-sm">Clear communication and regular updates throughout the project</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Results-Driven</h4>
                    <p className="text-slate-600 text-sm">Every solution is designed to drive measurable business results</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Long-Term Partnership</h4>
                    <p className="text-slate-600 text-sm">90-day optimization period included to ensure ongoing success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/work-with-us"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
