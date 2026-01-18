import { getCuratedJobs } from "@/app/lib/actions";
import { Building2, DollarSign, Briefcase, Home, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function ScrapedJobsSection() {
  const curatedJobs = await getCuratedJobs();

  if (curatedJobs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
            External Career Opportunities
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore remote work opportunities curated by our team
          </p>
        </div>

        <div className="space-y-12">
          {curatedJobs.slice(0, 3).map((job) => (
            <div key={job.id} className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900 border border-[#00A651]/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#00A651]/10">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                  {job.jobTitle}
                </h3>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Building2 className="text-[#0054A6]" size={20} />
                  <p className="text-xl text-[#0054A6] font-semibold">{job.companyName}</p>
                </div>
                {job.salaryRange && (
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                    {job.salaryRange}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="bg-black/60 rounded-2xl p-6 border border-white/10 mb-8">
                <h4 className="text-xl font-bold mb-4 text-white">About This Role</h4>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line line-clamp-4">
                  {job.description}
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-4 p-6 bg-black/40 rounded-xl border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#00A651]/20 flex items-center justify-center flex-shrink-0">
                    <Home className="text-[#00A651]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-white">100% Remote Work</h4>
                    <p className="text-slate-400 text-sm">Work from anywhere</p>
                  </div>
                </div>

                {job.salaryRange && (
                  <div className="flex items-start gap-4 p-6 bg-black/40 rounded-xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD400]/20 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="text-[#FFD400]" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-white">Competitive Pay</h4>
                      <p className="text-slate-400 text-sm">{job.salaryRange}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 p-6 bg-black/40 rounded-xl border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#0054A6]/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-[#0054A6]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-white">Curated Opportunity</h4>
                    <p className="text-slate-400 text-sm">Hand-picked by our team</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00A651] hover:bg-[#00A651]/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#00A651]/30"
                >
                  Apply Now
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/jobs"
            className="inline-block text-[#0054A6] hover:text-[#00A651] font-semibold transition-colors"
          >
            View All Opportunities →
          </Link>
        </div>
      </div>
    </section>
  );
}

