"use client";

import { submitAriseApplication } from "../../lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";

interface CuratedJobFormProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

export default function CuratedJobForm({ jobId, jobTitle, companyName }: CuratedJobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    formData.append('curatedJobId', jobId);
    formData.append('jobAppliedFor', jobTitle);
    
    const result = await submitAriseApplication(formData);

    if (result.success) {
      // Redirect to thank you page
      router.push("/jobs/thank-you");
    } else {
      setErrorMessage(result.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-xl">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Apply for {jobTitle}</h3>
        <p className="text-slate-400 mb-2">at <span className="text-indigo-400 font-semibold">{companyName}</span></p>
        <p className="text-slate-400 text-sm">Please fill out the form below. All fields marked with * are required.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor={`fullName-${jobId}`} className="text-sm font-medium text-slate-300">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input 
            id={`fullName-${jobId}`}
            name="fullName" 
            required 
            className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all" 
            placeholder="John Doe" 
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor={`email-${jobId}`} className="text-sm font-medium text-slate-300">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input 
            id={`email-${jobId}`}
            type="email" 
            name="email" 
            required 
            className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all" 
            placeholder="john@example.com" 
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor={`phone-${jobId}`} className="text-sm font-medium text-slate-300">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input 
            id={`phone-${jobId}`}
            type="tel" 
            name="phone" 
            required 
            className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all" 
            placeholder="(555) 123-4567" 
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor={`location-${jobId}`} className="text-sm font-medium text-slate-300">
            Location (City, State) <span className="text-red-400">*</span>
          </label>
          <input 
            id={`location-${jobId}`}
            name="location" 
            required 
            className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all" 
            placeholder="Seattle, WA" 
          />
        </div>

        {/* Workspace & Internet */}
        <div className="space-y-3 p-6 bg-black/40 rounded-xl border border-slate-700">
          <label className="text-sm font-medium text-slate-300 block">
            Do you have a quiet workspace and reliable internet? <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="hasWorkspace" 
                value="true"
                required
                className="w-5 h-5 text-indigo-500 border-slate-600 focus:ring-indigo-500 bg-slate-800" 
              />
              <span className="text-slate-300 group-hover:text-white transition-colors">Yes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="hasWorkspace" 
                value="false"
                required
                className="w-5 h-5 text-indigo-500 border-slate-600 focus:ring-indigo-500 bg-slate-800" 
              />
              <span className="text-slate-300 group-hover:text-white transition-colors">No</span>
            </label>
          </div>
        </div>

        {/* Previous Experience - Optional */}
        <div className="space-y-2">
          <label htmlFor={`experience-${jobId}`} className="text-sm font-medium text-slate-300">
            Previous relevant experience? <span className="text-slate-500 text-xs">(Optional)</span>
          </label>
          <textarea 
            id={`experience-${jobId}`}
            name="experience" 
            rows={4} 
            className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all resize-none" 
            placeholder="Tell us about your relevant experience for this position..." 
          />
        </div>

        {/* Referral Source - Optional */}
        <div className="space-y-2">
          <label htmlFor={`referralSource-${jobId}`} className="text-sm font-medium text-slate-300">
            How did you hear about us? <span className="text-slate-500 text-xs">(Optional)</span>
          </label>
          <select 
            id={`referralSource-${jobId}`}
            name="referralSource" 
            className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option value="">Select an option...</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Workshop">Workshop</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {errorMessage && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} /> 
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} /> 
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
}

