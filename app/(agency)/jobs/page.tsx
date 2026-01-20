import { Footer } from "../../components/agency/SectionComponents";
import AriseJobForm from "../../components/agency/AriseJobForm";
import CuratedJobForm from "../../components/agency/CuratedJobForm";
import ScrapedJobsSection from "../../components/agency/ScrapedJobsSection";
import { getCuratedJobs } from "../../lib/actions";
import { Check, Home, DollarSign, Users, Briefcase, Clock, ExternalLink, MapPin, Building2 } from "lucide-react";
import AtomBackground from "@/app/components/agency/AtomBackground";

export const metadata = {
  title: "Work From Home Jobs | Resilio Partners",
  description: "Join Resilio Partners and work from home providing customer service for top brands through the Arise platform. Flexible schedule, competitive pay.",
};

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  // Fetch curated jobs (only active ones)
  const curatedJobs = await getCuratedJobs();
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <AtomBackground />
      {/* Section 1: Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Work From Home with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">
              Top Brands
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Join Resilio Partners and start earning as a remote customer service professional
          </p>
        </div>
      </section>

      {/* Section 2: Featured Opportunity - Arise Platform */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Featured Badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-block px-6 py-2 rounded-full text-sm font-bold border border-[#0054A6]/30 bg-blue-50 text-[#0054A6] uppercase tracking-wider">
                Featured Opportunity
              </span>
            </div>

            {/* Main Arise Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">
                  Work From Home Providing Customer Service for Major Brands
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Earn $9-$25/hour depending on client and experience
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Home className="text-[#0054A6]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">100% Remote Work</h3>
                    <p className="text-gray-600 text-sm">Work from the comfort of your home</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[#00A651]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Flexible Schedule</h3>
                    <p className="text-gray-600 text-sm">You choose your hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Work With Top Brands</h3>
                    <p className="text-gray-600 text-sm">Apple, Disney, Intuit, and more</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Users className="text-cyan-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Comprehensive Support</h3>
                    <p className="text-gray-600 text-sm">From Resilio Partners team</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="text-[#FFD400]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Payroll Processing</h3>
                    <p className="text-gray-600 text-sm">Bi-weekly payments handled for you</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Tax Assistance</h3>
                    <p className="text-gray-600 text-sm">1099 help & quarterly estimates</p>
                  </div>
                </div>
              </div>

              {/* Requirements Section */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">Requirements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Check className="text-[#00A651] flex-shrink-0" size={20} />
                    <span className="text-gray-700">Quiet home workspace</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-[#00A651] flex-shrink-0" size={20} />
                    <span className="text-gray-700">Reliable high-speed internet (25+ Mbps)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-[#00A651] flex-shrink-0" size={20} />
                    <span className="text-gray-700">Computer with headset</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="text-[#00A651] flex-shrink-0" size={20} />
                    <span className="text-gray-700">Excellent communication skills</span>
                  </div>
                </div>
              </div>

              {/* What Makes Resilio Different */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 mb-12">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">What Makes Resilio Different?</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Working under Resilio Partners IBO is better than going solo:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="text-[#0054A6] flex-shrink-0 mt-0.5" size={20} />
                    <span><strong className="text-gray-900">Dedicated tech support team</strong> - No waiting days for help</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#0054A6] flex-shrink-0 mt-0.5" size={20} />
                    <span><strong className="text-gray-900">Bi-weekly payroll processing</strong> - Handled for you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#0054A6] flex-shrink-0 mt-0.5" size={20} />
                    <span><strong className="text-gray-900">1099 tax assistance and quarterly estimate help</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[#0054A6] flex-shrink-0 mt-0.5" size={20} />
                    <span><strong className="text-gray-900">Community of agents</strong> - Learn from and network with fellow professionals</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button - Scroll to Form */}
              <div className="text-center">
                <a 
                  href="#apply-now"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Application Form */}
      <section id="apply-now" className="py-16 pb-24 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 2 business days
              </p>
            </div>
            <AriseJobForm />
          </div>
        </div>
      </section>

      {/* Section 4: Other Remote Opportunities (Curated Jobs) */}
      {curatedJobs.length > 0 && (
        <section className="py-16 pb-24 bg-gradient-to-b from-black via-slate-950 to-black">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                Other Remote Opportunities
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Explore additional remote work opportunities. These are manually curated positions we've found that might be a good fit.
              </p>
            </div>

            <div className="space-y-12">
              {curatedJobs.map((job, index) => (
                <div key={job.id}>
                  {/* Curated Job Card - Similar to Featured Opportunity */}
                  <div className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-900/20 mb-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        {job.jobTitle}
                      </h2>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Building2 className="text-indigo-400" size={20} />
                        <p className="text-xl text-indigo-300 font-semibold">{job.companyName}</p>
                      </div>
                      {job.salaryRange && (
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                          {job.salaryRange}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="bg-black/60 rounded-2xl p-6 border border-white/10 mb-8">
                      <h3 className="text-xl font-bold mb-4 text-white">About This Role</h3>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>

                    {/* Benefits/Details Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-start gap-4 p-6 bg-black/40 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                          <Home className="text-indigo-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">100% Remote Work</h3>
                          <p className="text-slate-400 text-sm">Work from anywhere</p>
                        </div>
                      </div>

                      {job.salaryRange && (
                        <div className="flex items-start gap-4 p-6 bg-black/40 rounded-xl border border-white/5">
                          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <DollarSign className="text-green-400" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">Competitive Pay</h3>
                            <p className="text-slate-400 text-sm">{job.salaryRange}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4 p-6 bg-black/40 rounded-xl border border-white/5">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="text-purple-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Curated Opportunity</h3>
                          <p className="text-slate-400 text-sm">Hand-picked by our team</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button - Scroll to Form */}
                    <div className="text-center">
                      <a 
                        href={`#apply-${job.id}`}
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>

                  {/* Application Form for This Job */}
                  <section id={`apply-${job.id}`} className="py-12 scroll-mt-20">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-extrabold mb-4">Ready to Apply?</h3>
                        <p className="text-lg text-slate-400">
                          Fill out the form below for <span className="text-indigo-400 font-semibold">{job.jobTitle}</span> at {job.companyName}
                        </p>
                      </div>
                      <CuratedJobForm 
                        jobId={job.id} 
                        jobTitle={job.jobTitle}
                        companyName={job.companyName}
                      />
                    </div>
                  </section>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500">
                These positions are manually curated. For the best opportunity, consider applying to the featured Arise position above.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 5: RSS Feed Jobs (External Opportunities) */}
      <ScrapedJobsSection />

      <Footer />
    </main>
  );
}
