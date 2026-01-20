"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, Send, MapPin, MessageSquare, CheckCircle, AlertCircle, Building2, Briefcase, Rocket, Users } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/lib/actions";
import { Footer } from "@/app/components/agency/SectionComponents";

const BackgroundEffects = () => (
  <div className="fixed pointer-events-none inset-0 overflow-hidden z-0">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute -top-40 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-pink-500/10 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/5 to-blue-500/5 rounded-full blur-[100px]"
    />
  </div>
);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  async function clientAction(formData: FormData) {
    setIsSubmitting(true);
    setFormStatus(null);

    const result = await submitContactForm(formData);

    setIsSubmitting(false);
    setFormStatus(result);

    if (result.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) form.reset();
    }
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative">
      <BackgroundEffects />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
              <MessageSquare size={16} />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight text-slate-100">
              Let's Build Something <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A651] to-[#0054A6]">
                Extraordinary
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              At Resilio Partners, we believe everyone deserves a career they love, whether that's landing the perfect job or building your own business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Starting a Business */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                <Building2 className="text-indigo-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">STARTING A BUSINESS?</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                We help entrepreneurs choose the right business model, validate their plans, and secure funding. From business planning to franchise opportunities, we guide you every step of the way.
              </p>
              <a
                href="/work-with-us"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Get started →
              </a>
            </motion.div>

            {/* Looking for Work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 rounded-3xl p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                <Briefcase className="text-purple-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">LOOKING FOR WORK?</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Our OneClick Smart Resume tool revolutionizes your job search with AI-powered resume optimization, intelligent skill matching, and personalized job recommendations.
              </p>
              <a
                href="/jobs"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Transform your job hunt →
              </a>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-black/40 transition-colors group">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Website</h4>
                      <a href="https://resilio-partners.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium">
                        resilio-partners.com
                      </a>
                      <p className="text-slate-500 text-sm mt-1">Visit our main website</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-black/40 transition-colors group">
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Phone</h4>
                      <a href="tel:248-496-8798" className="text-green-400 hover:text-green-300 font-medium">
                        248-496-8798
                      </a>
                      <p className="text-slate-500 text-sm mt-1">Call us during business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-black/40 transition-colors group">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Email</h4>
                      <a href="mailto:contact@resiliopartners.com" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        contact@resiliopartners.com
                      </a>
                      <p className="text-slate-500 text-sm mt-1">For general inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-black/40 transition-colors group">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Location</h4>
                      <p className="text-slate-300 font-medium">White Lake, MI</p>
                      <p className="text-slate-500 text-sm mt-1">Serving clients nationwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Rocket className="text-indigo-400" size={20} />
                  About Resilio Partners
                </h3>
                <div className="space-y-3 text-slate-300 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Industry:</span>
                    <span className="font-medium">IT Services & IT Consulting</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Company Size:</span>
                    <span className="font-medium">2-10 employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Founded:</span>
                    <span className="font-medium">2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Headquarters:</span>
                    <span className="font-medium">White Lake, MI</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Business Planning", "Plan Execution", "Project Management", "Business Analytics",
                      "Risk Management", "Strategic Automation", "SaaS Development", "Agile Implementation"
                    ].slice(0, 8).map((spec, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <form
                id="contact-form"
                action={clientAction}
                className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                
                <h3 className="text-2xl font-bold mb-2 text-white">Send us a Message</h3>
                <p className="text-slate-400 mb-8 text-sm">Ready to take the next step in your career journey? Fill out the form below or visit our website.</p>

                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div className="space-y-5">
                  <div className="group">
                    <label className="text-sm font-medium text-slate-300 mb-2 block group-focus-within:text-indigo-400 transition-colors">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-slate-700 text-white placeholder-slate-600 focus:bg-black/70 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all"
                    />
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-slate-300 mb-2 block group-focus-within:text-indigo-400 transition-colors">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-slate-700 text-white placeholder-slate-600 focus:bg-black/70 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all"
                    />
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-slate-300 mb-2 block group-focus-within:text-indigo-400 transition-colors">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your project, business needs, or career goals..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-slate-700 text-white placeholder-slate-600 focus:bg-black/70 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Status Message */}
                  {formStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl flex items-center gap-3 ${
                        formStatus.success
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {formStatus.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                      <p className="text-sm font-medium">{formStatus.message}</p>
                    </motion.div>
                  )}

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
