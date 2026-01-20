import { Building2, DollarSign, Briefcase, MapPin, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { fetchSimplyHiredJobs } from "@/app/lib/actions";
import GeometricBackground from "./GeometricBackground";

export default async function ScrapedJobsSection() {
  // Fetch scraped jobs
  const scrapedJobs = await fetchSimplyHiredJobs('developer', 'remote', 6);

  // If no jobs found, show fallback content
  if (scrapedJobs.length === 0) {
    return (
      <section className="py-24 relative bg-slate-50 overflow-hidden">
        <GeometricBackground />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700">
              More Remote Opportunities
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Freshly gathered remote positions from across the web. 
              <span className="block text-sm mt-2 text-slate-500 font-medium">
                (Aggregated from various sources)
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <GeometricBackground />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700">
            More Remote Opportunities
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Freshly gathered remote positions from across the web. 
            <span className="block text-sm mt-2 text-slate-500 font-medium">
              (Aggregated from various sources)
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scrapedJobs.map((job, index) => {
            // Cycle through brand colors: Blue, Green, Yellow
            const colors = [
              { border: 'border-blue-200', hoverBorder: 'hover:border-blue-400', shadow: 'hover:shadow-lg', text: 'text-blue-600', icon: 'text-blue-600', bg: 'bg-blue-50' },
              { border: 'border-green-200', hoverBorder: 'hover:border-green-400', shadow: 'hover:shadow-lg', text: 'text-green-600', icon: 'text-green-600', bg: 'bg-green-50' },
              { border: 'border-yellow-200', hoverBorder: 'hover:border-yellow-400', shadow: 'hover:shadow-lg', text: 'text-yellow-600', icon: 'text-yellow-600', bg: 'bg-yellow-50' },
            ];
            const colorScheme = colors[index % 3];

            return (
              <div
                key={`${job.title}-${job.company}-${index}`}
                className={`group bg-white border ${colorScheme.border} ${colorScheme.hoverBorder} rounded-2xl p-6 transition-all duration-300 ${colorScheme.shadow}`}
              >
                {/* Job Title */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  
                  {/* Company & Location */}
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className={`w-4 h-4 ${colorScheme.icon}`} />
                    <span className="text-sm text-slate-600 font-medium">
                      {job.company || 'Company not specified'}
                    </span>
                  </div>
                  
                  {job.location && (
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className={`w-4 h-4 ${colorScheme.icon}`} />
                      <span className="text-sm text-slate-500">{job.location}</span>
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
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {job.description.substring(0, 150)}...
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-200">
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
                    <span className="text-sm text-slate-400">Job details unavailable</span>
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
            className="inline-flex items-center gap-3 group text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            <span>View All Opportunities</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
