import { Building2, DollarSign, Briefcase, MapPin, ExternalLink, Home, Clock, Users, Check } from "lucide-react";
import Link from "next/link";
import { fetchSimplyHiredJobs } from "@/app/lib/actions";

export default async function JobOpportunitiesSection() {
  // Arise Opportunity Data
  const ariseOpportunity = {
    title: "Work From Home Providing Customer Service for Major Brands",
    company: "Resilio Partners",
    location: "Remote",
    salary: "$9-$25/hour depending on client and experience",
    description: "Join Resilio Partners and start earning as a remote customer service professional. Work with top brands like Apple, Disney, Intuit, and more. Enjoy flexible schedules, comprehensive support, and bi-weekly payroll processing.",
    benefits: [
      { icon: Home, text: "100% Remote Work", subtext: "Work from the comfort of your home" },
      { icon: Clock, text: "Flexible Schedule", subtext: "You choose your hours" },
      { icon: Briefcase, text: "Work With Top Brands", subtext: "Apple, Disney, Intuit, and more" },
      { icon: Users, text: "Comprehensive Support", subtext: "From Resilio Partners team" },
    ],
    jobUrl: "/jobs#apply-now",
    isArise: true,
  };

  // Fetch 2 RSS jobs
  const rssJobs = await fetchSimplyHiredJobs('developer', 'remote', 2);
  
  // Map RSS jobs to opportunity format
  const rssOpportunities = rssJobs.map((job) => ({
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary || "See Details",
    description: job.description || "Remote opportunity available. Click to view full details.",
    jobUrl: job.jobUrl || "#",
    isArise: false,
    benefits: undefined as any, // RSS jobs don't have benefits
  }));

  // Combine: Arise first, then RSS jobs
  const opportunities = [ariseOpportunity, ...rssOpportunities].slice(0, 3);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-100">
            Work From Home with Top Brands
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join Resilio Partners and start earning as a remote customer service professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((job, index) => {
            // Cycle through brand colors: Blue, Green, Yellow
            const colors = [
              { border: 'border-[#0054A6]/50', hoverBorder: 'hover:border-[#0054A6]', shadow: 'hover:shadow-[0_0_30px_rgba(0,84,166,0.3)]', badge: 'bg-[#0054A6]/80 border-[#0054A6]/50', text: 'text-[#0054A6]', icon: 'text-[#0054A6]' },
              { border: 'border-[#00A651]/50', hoverBorder: 'hover:border-[#00A651]', shadow: 'hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]', badge: 'bg-[#00A651]/80 border-[#00A651]/50', text: 'text-[#00A651]', icon: 'text-[#00A651]' },
              { border: 'border-[#FFD400]/50', hoverBorder: 'hover:border-[#FFD400]', shadow: 'hover:shadow-[0_0_30px_rgba(255,212,0,0.3)]', badge: 'bg-[#FFD400]/80 border-[#FFD400]/50', text: 'text-[#FFD400]', icon: 'text-[#FFD400]' },
            ];
            const colorScheme = colors[index % 3];

            return (
              <div
                key={`${job.title}-${index}`}
                className={`group bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 border ${colorScheme.border} ${colorScheme.hoverBorder} rounded-2xl p-6 transition-all duration-300 ${colorScheme.shadow}`}
              >
                {/* Featured Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colorScheme.badge} ${colorScheme.text} uppercase tracking-wider`}>
                    Featured Opportunity
                  </span>
                </div>

                {/* Job Title */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD400] transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  
                  {/* Company & Location */}
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className={`w-4 h-4 ${colorScheme.icon}`} />
                    <span className="text-sm text-slate-300 font-medium">
                      {job.company}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className={`w-4 h-4 ${colorScheme.icon}`} />
                    <span className="text-sm text-slate-400">{job.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className={`w-4 h-4 ${colorScheme.icon}`} />
                    <span className={`text-sm font-semibold ${colorScheme.text}`}>
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* Benefits Preview - Only for Arise job */}
                {job.isArise && 'benefits' in job && job.benefits && (
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {(job.benefits as any[]).slice(0, 4).map((benefit: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <benefit.icon className={`w-3 h-3 ${colorScheme.icon} mt-0.5 flex-shrink-0`} />
                          <div>
                            <p className="text-xs font-semibold text-slate-300">{benefit.text}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{benefit.subtext}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Preview */}
                <div className="mb-4">
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Requirements Preview - Only for Arise job */}
                {job.isArise && (
                  <div className="mb-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className={`w-3 h-3 ${colorScheme.icon}`} />
                      <span>Quiet home workspace</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Check className={`w-3 h-3 ${colorScheme.icon}`} />
                      <span>Reliable high-speed internet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-3 h-3 ${colorScheme.icon}`} />
                      <span>Excellent communication skills</span>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-800">
                  {job.jobUrl && job.jobUrl.startsWith('http') ? (
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
                    <Link
                      href={job.jobUrl || "#"}
                      className={`inline-flex items-center gap-2 ${colorScheme.text} hover:opacity-80 font-semibold text-sm transition-all`}
                    >
                      <span>Apply Now</span>
                      <ExternalLink size={14} />
                    </Link>
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
            className="inline-flex items-center gap-3 group text-[#0054A6] hover:text-[#00A651] font-semibold text-lg transition-colors"
          >
            <span>View All Opportunities</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

