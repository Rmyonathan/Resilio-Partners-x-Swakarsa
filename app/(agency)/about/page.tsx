import { Footer } from "../../components/agency/SectionComponents";
import { Sparkles, Target, Shield, Rocket } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Resilio Partners",
  description: "Resilio's origin story, mission, and why businesses trust us. Founded by Jon after 20+ years in PM, built OneClick during job search, now helping businesses build platforms and marketing solutions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Resilio Partners</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Our origin story, mission, and why businesses trust us to deliver
        </p>
      </section>

      {/* Origin Story */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-12 mb-12">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
              <Sparkles className="text-indigo-400" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Origin Story</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>
                Resilio Partners was founded by <strong className="text-white">Jon Irwin</strong> after 20+ years in project management with leading organizations like Accenture, UAW Trust, and HTC Global. After years of helping Fortune 500 companies deliver complex projects, Jon found himself in the job market—and discovered a gap in the resume optimization space.
              </p>
              <p>
                That gap led to <Link href="/portfolio" className="text-indigo-400 hover:text-indigo-300 underline">OneClick Smart Resume</Link>—an AI-powered platform built during his own job search journey. What started as solving a personal problem became proof that complex, AI-driven platforms could be built quickly and effectively.
              </p>
              <p>
                Today, Resilio Partners helps growing businesses build custom platforms, optimize workflows, and deliver complete marketing solutions. We combine Jon's proven project management expertise with Jethro's 15+ years of technical leadership and a 20-person engineering team to deliver solutions that actually ship.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                <Target className="text-indigo-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To help growing businesses build custom platforms and marketing solutions that drive real results, backed by proven delivery methodology and hands-on leadership.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Shield className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Why Trust Us</h3>
              <p className="text-slate-400 leading-relaxed">
                Every project is personally scoped by Jon and delivered with quality guaranteed by Jethro. We combine 35+ combined years of experience with a proven track record of shipping.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <Rocket className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Promise</h3>
              <p className="text-slate-400 leading-relaxed">
                We don't just build—we deliver. Every project includes a 90-day optimization period to ensure maximum ROI and seamless integration with your business.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Hands-On Leadership</h4>
                    <p className="text-slate-400 text-sm">Direct access to leadership, not just project managers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Proven Delivery</h4>
                    <p className="text-slate-400 text-sm">35+ years combined experience with a track record of shipping</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Quality Guaranteed</h4>
                    <p className="text-slate-400 text-sm">Technical leadership ensures every project meets the highest standards</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Transparent Process</h4>
                    <p className="text-slate-400 text-sm">Clear communication and regular updates throughout the project</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Results-Driven</h4>
                    <p className="text-slate-400 text-sm">Every solution is designed to drive measurable business results</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Long-Term Partnership</h4>
                    <p className="text-slate-400 text-sm">90-day optimization period included to ensure ongoing success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/work-with-us"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
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

