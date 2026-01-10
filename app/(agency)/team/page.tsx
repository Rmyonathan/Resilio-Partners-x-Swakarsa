import { Footer } from "../../components/agency/SectionComponents";
import { Award, Users, Shield, Rocket, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our Team | Resilio Partners",
  description: "Meet Jon Irwin and Jethro Lim - The leaders behind Resilio Partners.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Team</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Established credibility through proven expertise and hands-on leadership
        </p>
      </section>

      {/* Leadership Team */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {/* Jon Irwin */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-12">
              <div className="mb-6">
                <div className="w-32 h-32 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src="/images/jon_irwin.jpg" 
                    alt="Jon Irwin" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Jon Irwin</h2>
                <p className="text-lg text-indigo-400 font-semibold mb-4">Founder & Principal Consultant</p>
              </div>
              
              <div className="space-y-4 text-slate-300 leading-relaxed mb-6">
                <p>
                  <strong className="text-white">PMP certified, Air Force veteran</strong> with 20+ years of project management experience across top-tier organizations including Accenture, UAW Trust, and HTC Global.
                </p>
                <p>
                  Jon personally scopes every project and ensures delivery excellence. His hands-on approach means you get direct access to leadership, not just a project manager.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">PMP Certified</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Air Force Veteran</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">20+ Years PM</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-sm text-slate-400 italic">
                  "I personally scope every project and ensure delivery excellence."
                </p>
              </div>
            </div>

            {/* Jethro Lim */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 rounded-3xl p-8 md:p-12">
              <div className="mb-6">
                <div className="w-32 h-32 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src="/images/jethro.jpeg" 
                    alt="Jethro Lim" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Jethro Lim</h2>
                <p className="text-lg text-purple-400 font-semibold mb-4">Chief Operating Officer</p>
              </div>
              
              <div className="space-y-4 text-slate-300 leading-relaxed mb-6">
                <p>
                  With <strong className="text-white">2+ years managing development teams</strong>, Jethro oversees all technical delivery and ensures quality across every project.
                </p>
                <p>
                  His expertise spans full-stack development, AI/ML integration, and workflow automation. Jethro manages our 20-person engineering team and guarantees quality delivery.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">2+ Years Leadership</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">Technical Delivery</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">Team Manager</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-sm text-slate-400 italic">
                  "I manage our 20-person engineering team and guarantee quality."
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Team Section */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
                <Users className="text-cyan-400" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Delivery Team</h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Behind every project is our team of 20+ experienced developers across multiple specialties:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Rocket className="text-cyan-400 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-300 font-medium">AI/ML</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Shield className="text-indigo-400 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-300 font-medium">Full-Stack</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Rocket className="text-purple-400 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-300 font-medium">Workflow Automation</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Award className="text-green-400 mx-auto mb-2" size={24} />
                  <p className="text-sm text-slate-300 font-medium">Web & Marketing</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-8 italic mb-6">
                Individual team members are not listed to protect client confidentiality and team privacy.
              </p>
              <Link
                href="/team/cvs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 transition-all font-semibold"
              >
                <FileText size={18} />
                View All Team CVs
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
