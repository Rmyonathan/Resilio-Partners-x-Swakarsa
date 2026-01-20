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
    <main className="min-h-screen bg-white relative overflow-hidden">
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
