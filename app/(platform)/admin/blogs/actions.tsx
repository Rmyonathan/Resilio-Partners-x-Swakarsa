"use client";

import { deleteBlogPost } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function BlogDeleteForm({ blogId, blogTitle }: { blogId: string; blogTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsSubmitting(true);
    const result = await deleteBlogPost(blogId);
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Blog Post?</h3>
          <p className="text-sm text-slate-600 mb-4">
            Are you sure you want to delete <strong>{blogTitle}</strong>? This action cannot be undone.
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
      title="Delete Blog Post"
    >
      <Trash2 size={18} />
    </button>
  );
}

