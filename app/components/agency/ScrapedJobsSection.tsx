import { Building2, DollarSign, Briefcase, MapPin, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { fetchSimplyHiredJobs } from "@/app/lib/actions";

export default async function ScrapedJobsSection() {
  // Fetch scraped jobs
  const scrapedJobs = await fetchSimplyHiredJobs('developer', 'remote', 6);

  // If no jobs found, show fallback content
  if (scrapedJobs.length === 0) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              External Career Opportunities
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Check back soon for remote developer opportunities
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            External Career Opportunities
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover remote developer positions from top companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scrapedJobs.map((job, index) => {
            // Cycle through brand colors: Blue, Green, Yellow
            const colors = [
              { border: 'border-[#0054A6]/50', hoverBorder: 'hover:border-[#0054A6]', shadow: 'hover:shadow-[0_0_30px_rgba(0,84,166,0.3)]', badge: 'bg-[#0054A6]/80 border-[#0054A6]/50', text: 'text-[#0054A6]', icon: 'text-[#0054A6]' },
              { border: 'border-[#00A651]/50', hoverBorder: 'hover:border-[#00A651]', shadow: 'hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]', badge: 'bg-[#00A651]/80 border-[#00A651]/50', text: 'text-[#00A651]', icon: 'text-[#00A651]' },
              { border: 'border-[#FFD400]/50', hoverBorder: 'hover:border-[#FFD400]', shadow: 'hover:shadow-[0_0_30px_rgba(255,212,0,0.3)]', badge: 'bg-[#FFD400]/80 border-[#FFD400]/50', text: 'text-[#FFD400]', icon: 'text-[#FFD400]' },
            ];
            const colorScheme = colors[index % 3];

            return (
              <div
                key={`${job.title}-${job.company}-${index}`}
                className={`group bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 border ${colorScheme.border} ${colorScheme.hoverBorder} rounded-2xl p-6 transition-all duration-300 ${colorScheme.shadow}`}
              >
                {/* Job Title */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD400] transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  
                  {/* Company & Location */}
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className={`w-4 h-4 ${colorScheme.icon}`} />
                    <span className="text-sm text-slate-300 font-medium">
                      {job.company || 'Company not specified'}
                    </span>
                  </div>
                  
                  {job.location && (
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className={`w-4 h-4 ${colorScheme.icon}`} />
                      <span className="text-sm text-slate-400">{job.location}</span>
                    </div>
                  )}
                  
                  {job.salary && (
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className={`w-4 h-4 ${colorScheme.icon}`} />
                      <span className={`text-sm font-semibold ${colorScheme.text}`}>
                        {job.salary}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description Preview */}
                {job.description && (
                  <div className="mb-4">
                    <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {job.description.substring(0, 150)}...
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-800">
                  {job.jobUrl ? (
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${colorScheme.text} hover:opacity-80 font-semibold text-sm transition-all`}
                    >
                      <span>View Job</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-sm text-slate-500">Job details unavailable</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-3 group text-[#FFD400] hover:text-[#00A651] font-semibold text-lg transition-colors"
          >
            <span>View All Opportunities</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
