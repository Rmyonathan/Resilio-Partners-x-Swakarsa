import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HeroSection from "@/app/components/agency/HeroSection";
import HowWeWorkSection from "@/app/components/agency/HowWeWorkSection";
import ScrapedJobsSection from "@/app/components/agency/ScrapedJobsSection";
import BlogSection from "@/app/components/agency/BlogSection";
import { Footer } from "@/app/components/agency/SectionComponents";

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
    <main className="min-h-screen text-white selection:bg-[#0054A6]/30 relative overflow-hidden">
      {/* Brand color gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#001428] via-[#000A14] to-[#001428] -z-10">
        {/* Subtle brand color overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0054A6]/15 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00A651]/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD400]/8 to-transparent"></div>
      </div>
      {/* Hero Section */}
      <HeroSection />

      {/* Section 2: How We Work */}
      <HowWeWorkSection />

      {/* Section 3: External Career Opportunities */}
      <ScrapedJobsSection />

      {/* Section 4: Blog Section */}
      <BlogSection />

      <Footer />
    </main>
  );
}
