import { Building2, DollarSign, Briefcase, MapPin, ExternalLink, Home, Clock, Users, Check, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { getCuratedJobs } from "@/app/lib/actions";
import WaveLinesAnimation from "./WaveLinesAnimation";

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

  // Fetch curated jobs from database (only active ones)
  const curatedJobs = await getCuratedJobs();
  
  // Map curated jobs to opportunity format
  const curatedOpportunities = curatedJobs.slice(0, 2).map((job) => ({
    title: job.jobTitle,
    company: job.companyName,
    location: "Remote",
    salary: job.salaryRange || "See Details",
    description: job.description || "Remote opportunity available. Click to view full details.",
    jobUrl: `/jobs#apply-${job.id}`,
    isArise: false,
    benefits: undefined as any, // Curated jobs don't have benefits in this format
  }));

  // Combine: Arise first, then curated jobs (max 3 total)
  const opportunities = [ariseOpportunity, ...curatedOpportunities].slice(0, 3);

  return (
    <section className="py-24 relative z-10 overflow-hidden w-full">
      {/* Wave Lines Animation Background - Full Width */}
      <WaveLinesAnimation />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700">
            Work From Home with Top Brands
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join Resilio Partners and start earning as a remote customer service professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((job, index) => {
            return (
              <div
                key={`${job.title}-${index}`}
                className="group bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                {/* Featured Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider">
                    Featured Opportunity
                  </span>
                </div>

                {/* Job Title */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 text-slate-900">
                    {job.title}
                  </h3>
                  
                  {/* Company & Location */}
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-600 font-medium">
                      {job.company}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-600">{job.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-900">
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
                          <benefit.icon className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{benefit.text}</p>
                            <p className="text-xs text-slate-600 line-clamp-1">{benefit.subtext}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Preview */}
                <div className="mb-4">
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Requirements Preview - Only for Arise job */}
                {job.isArise && (
                  <div className="mb-4 text-xs text-slate-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>Quiet home workspace</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>Reliable high-speed internet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>Excellent communication skills</span>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-200">
                  {job.jobUrl && job.jobUrl.startsWith('http') ? (
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                      <span>View Job</span>
                      <ExternalLink size={14} className="text-blue-600" />
                    </a>
                  ) : (
                    <Link
                      href={job.jobUrl || "#"}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                      <span>Apply Now</span>
                      <ExternalLink size={14} className="text-blue-600" />
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
            className="inline-flex items-center gap-3 group font-semibold text-lg transition-colors text-blue-600 hover:text-blue-700"
          >
            <span>View All Opportunities</span>
            <ExternalLink className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* OneClick Smart Resume CTA */}
        <div className="mt-8 mb-0">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-purple-200">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-purple-700">Boost Your Job Search</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Looking for more opportunities? Use <strong className="text-purple-700">OneClick Smart Resume</strong> to optimize your resume with AI, match your skills to jobs, and get personalized job recommendations.
                </p>
                <a 
                  href="https://oneclicksmartresume.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <FileText size={18} />
                  Try OneClick Smart Resume
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

