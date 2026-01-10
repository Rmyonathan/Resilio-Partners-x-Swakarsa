"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Job {
  jobTitle: string;
  companyName: string;
  description: string;
  salaryRange: string | null;
  applyUrl: string;
  isActive: boolean;
}

export function JobForm({ action, job }: { action: (formData: FormData) => Promise<any>; job?: Job }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await action(formData);
      if (result?.success !== false) {
        // If redirect happens in server action, this won't execute
        // But if there's an error, we'll show it
        if (result?.message && result.success === false) {
          setError(result.message);
        }
      } else {
        setError(result.message || "Failed to save job. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-semibold text-slate-700 mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          required
          defaultValue={job?.jobTitle || ''}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Senior Frontend Developer"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-2">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          required
          defaultValue={job?.companyName || ''}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Tech Company Inc."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={job?.description || ''}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Brief description (2-3 sentences about the role and requirements)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="salaryRange" className="block text-sm font-semibold text-slate-700 mb-2">
            Salary Range <span className="text-slate-400 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="salaryRange"
            name="salaryRange"
            defaultValue={job?.salaryRange || ''}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., $50K-$75K or $9-$25/hour"
          />
        </div>

        <div>
          <label htmlFor="applyUrl" className="block text-sm font-semibold text-slate-700 mb-2">
            Apply URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="applyUrl"
            name="applyUrl"
            required
            defaultValue={job?.applyUrl || ''}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://company.com/jobs/apply"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          value="true"
          defaultChecked={job?.isActive !== false}
          className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">
          Active (Job will be visible on the Jobs page)
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <span className="font-semibold">{error}</span>
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            "Save Job"
          )}
        </button>
        <Link
          href="/admin/jobs"
          className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

