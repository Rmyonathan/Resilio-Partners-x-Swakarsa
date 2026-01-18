import { Footer } from "../../components/agency/SectionComponents";
import { Calendar, CheckCircle, DollarSign, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import AtomBackground from "@/app/components/agency/AtomBackground";

export const metadata = {
  title: "Work With Us | Resilio Partners",
  description: "Book a discovery call, learn about our process, and get answers to frequently asked questions. No traditional pricing page—we scope every project personally.",
};

export default function WorkWithUsPage() {
  return (
    <main className="min-h-screen text-white selection:bg-[#0054A6]/30 relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center, rgba(255, 212, 0, 0.03) 0%, rgba(10, 16, 37, 0.6) 50%, rgba(0, 0, 0, 1) 100%)',
    }}>
      <AtomBackground />
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Work With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Us</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Our process is designed to ensure the right fit and deliver results that drive your business forward
        </p>
      </section>

      {/* Process Section */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every project starts with understanding your needs and ends with a solution that delivers results
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-8 mb-16">
            {/* Step 1: Discovery Call */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-indigo-400">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Book Discovery Call</h3>
                  <p className="text-sm text-indigo-400 font-semibold">30 min • Free</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    Start with a free 30-minute discovery call. We'll discuss your business needs, goals, and challenges. This helps us understand if we're the right fit for your project.
                  </p>
                  <a
                    href="https://calendly.com/resilio-partners/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    <Calendar size={20} />
                    Schedule Your Call
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2: Discovery Sprint */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-purple-400">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Discovery Sprint</h3>
                  <p className="text-sm text-purple-400 font-semibold">$5K • 2 weeks</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    If we're a good fit, we'll run a Discovery Sprint. This 2-week engagement includes:
                  </p>
                  <ul className="space-y-3 mb-6 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                      <span>Comprehensive audit of your current processes and systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                      <span>Identification of opportunities and potential solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                      <span><strong className="text-white">Full proposal with fixed pricing</strong> based on your specific needs</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-400 italic">
                    The Discovery Sprint ensures accurate scoping and transparent pricing before you commit to the full project.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Project Kickoff */}
            <div className="bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-cyan-400">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Project Kickoff</h3>
                  <p className="text-sm text-cyan-400 font-semibold">SOW • 50% deposit</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    Once you approve the proposal, we'll:
                  </p>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                      <span>Finalize the Statement of Work (SOW) with clear deliverables and timelines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                      <span>Collect 50% deposit to begin development</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                      <span>Kick off the project with regular sprint updates and transparent communication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <HelpCircle className="text-indigo-400 mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="border-b border-slate-800 pb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="text-indigo-400" size={24} />
                  What does a typical project cost?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Product development: <strong className="text-white">$25K-$50K</strong>. Websites/marketing: <strong className="text-white">$8K-$15K</strong>. All pricing is fixed-price and provided after the Discovery Sprint, ensuring accurate scoping and no surprises.
                </p>
              </div>

              <div className="border-b border-slate-800 pb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Clock className="text-purple-400" size={24} />
                  Do you work hourly?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  No, all engagements are <strong className="text-white">project-based with fixed pricing</strong>. This ensures transparency, predictable costs, and alignment on deliverables from day one.
                </p>
              </div>

              <div className="border-b border-slate-800 pb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Clock className="text-cyan-400" size={24} />
                  How long does a project take?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Software platforms: <strong className="text-white">8-12 weeks</strong>. Websites: <strong className="text-white">4-6 weeks</strong>. Timelines are established during the Discovery Sprint and included in the fixed-price proposal.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={24} />
                  What's included after launch?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Every project includes a <strong className="text-white">90-day optimization period</strong> where we fine-tune performance, train your team, and ensure seamless integration. We're committed to your success beyond launch.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-400 mb-6">
              Ready to get started? Let's discuss your project.
            </p>
            <a
              href="https://calendly.com/resilio-partners/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
            >
              <Calendar size={20} />
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

