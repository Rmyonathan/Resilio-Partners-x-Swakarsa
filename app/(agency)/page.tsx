import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HeroSection from "@/app/components/agency/HeroSection";
import AboutPreview from "@/app/components/agency/AboutPreview";
import PortfolioPreview from "@/app/components/agency/PortfolioPreview";
import TeamPreview from "@/app/components/agency/TeamPreview";
import HowWeWorkSection from "@/app/components/agency/HowWeWorkSection";
import JobOpportunitiesSection from "@/app/components/agency/JobOpportunitiesSection";
import BlogSection from "@/app/components/agency/BlogSection";
import ContactCTA from "@/app/components/agency/ContactCTA";
import { Footer } from "@/app/components/agency/SectionComponents";
import AtomBackground from "@/app/components/agency/AtomBackground";
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
    <main className="min-h-screen text-slate-100 selection:bg-[#0054A6]/30 relative overflow-hidden" style={{
      background: `
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 166, 81, 0.2), transparent),
        radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0, 84, 166, 0.18), transparent),
        radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255, 212, 0, 0.15), transparent),
        linear-gradient(180deg, #1e293b 0%, #0f172a 100%)
      `
    }}>
      {/* Resilio Atom Background */}
      <AtomBackground />
      {/* Hero Section */}
      <HeroSection />

      {/* About Preview */}
      <AboutPreview />

      {/* Portfolio Preview */}
      <PortfolioPreview />

      {/* Team Preview */}
      <TeamPreview />

      {/* How We Work */}
      <HowWeWorkSection />

      {/* Job Opportunities */}
      <JobOpportunitiesSection />

      {/* Blog Preview */}
      <BlogSection />

      {/* Contact CTA */}
      <ContactCTA />

      <Footer />
    </main>
  );
}
