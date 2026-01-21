import { Footer } from "../../../components/agency/SectionComponents";
import { CheckCircle, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import FlowingBackground from "../../../components/agency/FlowingBackground";

export const metadata = {
  title: "Application Received | Resilio Partners",
  description: "Thank you for applying to work with Resilio Partners. We'll review your application and get back to you soon.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <FlowingBackground />
      
      <section className="pt-32 pb-24 min-h-screen flex items-center relative z-10">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-white border border-slate-200 rounded-3xl p-12 md:p-16 shadow-lg">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-700">
              Application Received!
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Thank you for your interest in working with Resilio Partners! We've received your application and are excited to help you start your work-from-home journey.
            </p>

            <div className="bg-slate-50 rounded-2xl p-8 mb-8 text-left border border-slate-200">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
                <Calendar className="text-blue-600" size={28} />
                What happens next:
              </h2>
              <ol className="space-y-4 text-slate-700">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-600">1</span>
                  <span className="pt-1">We'll review your application within <strong className="text-slate-900">2 business days</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-600">2</span>
                  <span className="pt-1">If approved, you'll receive an <strong className="text-slate-900">onboarding email</strong> with detailed setup instructions</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-600">3</span>
                  <span className="pt-1">We'll guide you through the <strong className="text-slate-900">Arise University enrollment process</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-600">4</span>
                  <span className="pt-1">Our tech support team will help you <strong className="text-slate-900">get certified and start earning</strong></span>
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div className="text-left">
                  <p className="text-slate-700 mb-2">
                    <strong className="text-slate-900">Check your email</strong> for a confirmation message with next steps.
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong className="text-slate-900">Questions?</strong> Reply to the confirmation email or contact us at <a href="mailto:support@resiliopartners.com" className="text-blue-600 hover:text-blue-700 underline">support@resiliopartners.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                View Other Opportunities
              </Link>
              <Link
                href="/"
                className="inline-block border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
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

