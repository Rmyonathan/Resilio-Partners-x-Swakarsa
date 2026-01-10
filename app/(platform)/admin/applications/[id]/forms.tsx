"use client";

import { updateApplicationStatus, updateApplicationNotes } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

export function UpdateStatusForm({ applicationId, currentStatus }: { applicationId: string; currentStatus: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSuccess(false);
    
    formData.append('id', applicationId);
    const result = await updateApplicationStatus(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.refresh();
        setSuccess(false);
      }, 1500);
    }
    
    setIsSubmitting(false);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <select
        name="status"
        defaultValue={currentStatus}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="NEW">New</option>
        <option value="REVIEWING">Reviewing</option>
        <option value="APPROVED">Approved</option>
        <option value="ONBOARDING">Onboarding</option>
        <option value="ACTIVE">Active</option>
        <option value="REJECTED">Rejected</option>
      </select>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Updating...
          </>
        ) : success ? (
          <>
            <CheckCircle size={16} />
            Updated!
          </>
        ) : (
          "Update Status"
        )}
      </button>
    </form>
  );
}

export function UpdateNotesForm({ applicationId, currentNotes }: { applicationId: string; currentNotes: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSuccess(false);
    
    formData.append('id', applicationId);
    const result = await updateApplicationNotes(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.refresh();
        setSuccess(false);
      }, 1500);
    }
    
    setIsSubmitting(false);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <textarea
        name="notes"
        defaultValue={currentNotes}
        rows={6}
        placeholder="Add internal notes about this applicant..."
        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Saving...
          </>
        ) : success ? (
          <>
            <CheckCircle size={16} />
            Saved!
          </>
        ) : (
          "Save Notes"
        )}
      </button>
    </form>
  );
}

