"use client";

import { toggleCuratedJobActive, deleteCuratedJob } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Trash2, Loader2, CheckCircle } from "lucide-react";

export function JobToggleForm({ jobId, isActive }: { jobId: string; isActive: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleToggle(formData: FormData) {
    setIsSubmitting(true);
    formData.append('id', jobId);
    await toggleCuratedJobActive(formData);
    router.refresh();
    setIsSubmitting(false);
  }

  return (
    <form action={handleToggle}>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
          isActive
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <Loader2 size={12} className="animate-spin" />
        ) : isActive ? (
          <>
            <Eye size={12} />
            Active
          </>
        ) : (
          <>
            <EyeOff size={12} />
            Inactive
          </>
        )}
      </button>
    </form>
  );
}

export function JobDeleteForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsSubmitting(true);
    const result = await deleteCuratedJob(jobId);
    if (result.success) {
      router.refresh();
    }
    setIsSubmitting(false);
    setShowConfirm(false);
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Job?</h3>
          <p className="text-sm text-slate-600 mb-4">
            Are you sure you want to delete <strong>{jobTitle}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete Job"
    >
      <Trash2 size={16} />
    </button>
  );
}

