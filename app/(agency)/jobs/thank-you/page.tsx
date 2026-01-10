import { Footer } from "../../../components/agency/SectionComponents";
import { CheckCircle, Mail, Calendar, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Application Received | Resilio Partners",
  description: "Thank you for applying to work with Resilio Partners. We'll review your application and get back to you soon.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <section className="pt-32 pb-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-3xl p-12 md:p-16">
            <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Application Received!
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Thank you for your interest in working with Resilio Partners! We've received your application and are excited to help you start your work-from-home journey.
            </p>

            <div className="bg-black/60 rounded-2xl p-8 mb-8 text-left border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="text-indigo-400" size={28} />
                What happens next:
              </h2>
              <ol className="space-y-4 text-slate-300">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">1</span>
                  <span className="pt-1">We'll review your application within <strong className="text-white">2 business days</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">2</span>
                  <span className="pt-1">If approved, you'll receive an <strong className="text-white">onboarding email</strong> with detailed setup instructions</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">3</span>
                  <span className="pt-1">We'll guide you through the <strong className="text-white">Arise University enrollment process</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">4</span>
                  <span className="pt-1">Our tech support team will help you <strong className="text-white">get certified and start earning</strong></span>
                </li>
              </ol>
            </div>

            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="text-indigo-400 flex-shrink-0 mt-1" size={20} />
                <div className="text-left">
                  <p className="text-slate-300 mb-2">
                    <strong className="text-white">Check your email</strong> for a confirmation message with next steps.
                  </p>
                  <p className="text-sm text-slate-400">
                    <strong className="text-white">Questions?</strong> Reply to the confirmation email or contact us at <a href="mailto:support@resiliopartners.com" className="text-indigo-400 hover:text-indigo-300 underline">support@resiliopartners.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                View Other Opportunities
              </Link>
              <Link
                href="/"
                className="inline-block border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-indigo-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

