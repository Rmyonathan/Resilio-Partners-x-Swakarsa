import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HeroSection from "@/app/components/agency/HeroSection";
import HowWeWorkSection from "@/app/components/agency/HowWeWorkSection";
import { Footer } from "@/app/components/agency/SectionComponents";
import { Code, Globe, Palette } from "lucide-react";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AgencyHome() {
  // Smart redirect if logged in
  const session = await auth();
  
  if (session?.user) {
    const role = (session.user as any).role;
    
    if (role === 'ADMIN') redirect('/admin');
    if (role === 'CLIENT') redirect('/lab');
    if (role === 'CONSULTANT') redirect('/guild');
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <HeroSection />

      {/* Section 2: How We Work */}
      <HowWeWorkSection />

      {/* Section 3: What We Deliver */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              What We Deliver
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Software Platforms & Tools */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="text-indigo-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Software Platforms & Tools</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Custom-built software solutions that automate workflows, streamline operations, and scale with your business.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <span className="text-sm font-semibold text-indigo-400">Resilio Partners</span>
              </div>
            </div>

            {/* Websites & Marketing */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Websites & Marketing</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Modern websites, SEO optimization, and complete digital marketing strategies that drive traffic and conversions.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <span className="text-sm font-semibold text-purple-400">Resilio Partners</span>
              </div>
            </div>

            {/* Full-Service Solutions */}
            <div className="bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Full-Service Solutions</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                End-to-end solutions combining custom software, web development, and marketing for complete digital transformation.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <span className="text-sm font-semibold text-cyan-400">Both Teams</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
