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
import WarmWaves from "@/app/components/visuals/WarmWaves";
// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AgencyHome() {
  // Smart redirect if logged in (but keep admins on agency pages to access navbar)
  const session = await auth();
  
  if (session?.user) {
    const role = (session.user as any).role;
    
    // Admins stay on agency pages to access navbar - they can use "Admin Dashboard" link
    // if (role === 'ADMIN') redirect('/admin'); // Removed - admins stay here
    if (role === 'CLIENT') redirect('/lab');
    if (role === 'CONSULTANT') redirect('/guild');
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Hero Section - White */}
      <div className="relative bg-white">
        <HeroSection />
      </div>

      {/* About Preview - White */}
      <div className="relative bg-white">
        <AboutPreview />
      </div>

      {/* Portfolio Preview - Light Grey */}
      <div className="relative bg-slate-50">
        <PortfolioPreview />
      </div>

      {/* Team Preview - White */}
      <div className="relative bg-white">
        <TeamPreview />
      </div>

      {/* How We Work - Light Grey */}
      <div className="relative bg-slate-50 overflow-hidden">
        <WarmWaves />
        <div className="relative z-10">
          <HowWeWorkSection />
        </div>
      </div>

      {/* Job Opportunities - White */}
      <div className="relative bg-white">
        <JobOpportunitiesSection />
      </div>

      {/* Blog Preview - Light Grey */}
      <div className="relative bg-slate-50 overflow-visible">
        <BlogSection />
      </div>

      {/* Contact CTA - White */}
      <div className="relative bg-white">
        <ContactCTA />
      </div>

      <Footer />
    </main>
  );
}
