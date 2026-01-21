import { Footer } from "../../components/agency/SectionComponents";
import { Calendar, CheckCircle, DollarSign, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import ProcessBackground from "../../components/agency/ProcessBackground";
import PreMeetingForm from "../../components/agency/PreMeetingForm";
export const metadata = {
  title: "Work With Us | Resilio Partners",
  description: "Book a discovery call, learn about our process, and get answers to frequently asked questions. No traditional pricing page—we scope every project personally.",
};

export default function WorkWithUsPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <ProcessBackground />
      
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-blue-700">
          Work With Us
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Our process is designed to ensure the right fit and deliver results that drive your business forward
        </p>
      </section>

      {/* Process Section */}
      <section className="py-16 pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Our Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every project starts with understanding your needs and ends with a solution that delivers results
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-8 mb-16">
            {/* Step 1: Discovery Call */}
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-blue-500 rounded-3xl p-8 md:p-12 shadow-md hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-slate-200 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Book Discovery Call</h3>
                  <p className="text-sm text-blue-600 font-semibold">30 min • Free</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Start with a free 30-minute discovery call. We'll discuss your business needs, goals, and challenges. This helps us understand if we're the right fit for your project.
                  </p>
                  <div className="mt-6">
                    <PreMeetingForm />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Discovery Sprint */}
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-blue-500 rounded-3xl p-8 md:p-12 shadow-md hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-slate-200 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Discovery Sprint</h3>
                  <p className="text-sm text-blue-600 font-semibold">$5K • 2 weeks</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    If we're a good fit, we'll run a Discovery Sprint. This 2-week engagement includes:
                  </p>
                  <ul className="space-y-3 mb-6 text-slate-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Comprehensive audit of your current processes and systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Identification of opportunities and potential solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong className="text-slate-900">Full proposal with fixed pricing</strong> based on your specific needs</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 italic">
                    The Discovery Sprint ensures accurate scoping and transparent pricing before you commit to the full project.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Project Kickoff */}
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-blue-500 rounded-3xl p-8 md:p-12 shadow-md hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-slate-200 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Project Kickoff</h3>
                  <p className="text-sm text-blue-600 font-semibold">SOW • 50% deposit</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Once you approve the proposal, we'll:
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Finalize the Statement of Work (SOW) with clear deliverables and timelines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Collect 50% deposit to begin development</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>Kick off the project with regular sprint updates and transparent communication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 md:p-12 shadow-md">
            <div className="text-center mb-12">
              <HelpCircle className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <DollarSign className="text-blue-600" size={24} />
                  What does a typical project cost?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Product development: <strong className="text-slate-900">$25K-$50K</strong>. Websites/marketing: <strong className="text-slate-900">$8K-$15K</strong>. All pricing is fixed-price and provided after the Discovery Sprint, ensuring accurate scoping and no surprises.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="text-blue-600" size={24} />
                  Do you work hourly?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  No, all engagements are <strong className="text-slate-900">project-based with fixed pricing</strong>. This ensures transparency, predictable costs, and alignment on deliverables from day one.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="text-blue-600" size={24} />
                  How long does a project take?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Software platforms: <strong className="text-slate-900">8-12 weeks</strong>. Websites: <strong className="text-slate-900">4-6 weeks</strong>. Timelines are established during the Discovery Sprint and included in the fixed-price proposal.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="text-blue-600" size={24} />
                  What's included after launch?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Every project includes a <strong className="text-slate-900">90-day optimization period</strong> where we fine-tune performance, train your team, and ensure seamless integration. We're committed to your success beyond launch.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-600 mb-6 bg-white/50 inline-block px-4 py-1 rounded-full">
              Ready to get started? Let's discuss your project.
            </p>
            <br/>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jirwin@resilio-partners.com&su=Discovery Call Booking Request&body=Hi Jon,%0D%0A%0D%0AI would like to schedule a discovery call to discuss my business needs.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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

