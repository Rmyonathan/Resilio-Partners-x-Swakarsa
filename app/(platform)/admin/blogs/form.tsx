"use client";

import { useState } from "react";
import { FileText, Image, Eye } from "lucide-react";

interface Blog {
  id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  cover_image_url?: string;
  status?: string;
  source?: string;
  external_link?: string;
}

export function BlogForm({ action, blog }: { action: (formData: FormData) => Promise<any>; blog?: Blog }) {
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
        setError(result.message || "Failed to save blog post. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <FileText size={16} />
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={blog?.title}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
          placeholder="Enter blog post title"
        />
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium text-slate-700">
          Excerpt (Optional)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={blog?.excerpt}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all resize-none"
          placeholder="Brief description of the blog post"
        />
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-2">
        <label htmlFor="cover_image" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Image size={16} />
          Cover Image (Optional)
        </label>
        <input
          id="cover_image"
          name="cover_image"
          type="file"
          accept="image/*"
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        {blog?.cover_image_url && (
          <p className="text-xs text-slate-500">
            Current image: <span className="font-mono">{blog.cover_image_url}</span>
          </p>
        )}
        <p className="text-xs text-slate-500">
          Upload a cover image for your blog post. Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Eye size={16} />
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={15}
          defaultValue={blog?.content}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all resize-none font-mono text-sm"
          placeholder="Write your blog post content here..."
        />
        <p className="text-xs text-slate-500">Supports markdown and HTML formatting (optional)</p>
      </div>

      {/* Status Selection */}
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium text-slate-700">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          name="status"
          defaultValue={blog?.status || 'draft'}
          required
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Source (Optional) */}
      <div className="space-y-2">
        <label htmlFor="source" className="text-sm font-medium text-slate-700">
          Source (Optional)
        </label>
        <input
          id="source"
          name="source"
          type="text"
          defaultValue={blog?.source || 'Resilio'}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
          placeholder="Resilio"
        />
      </div>

      {/* External Link (Optional) */}
      <div className="space-y-2">
        <label htmlFor="external_link" className="text-sm font-medium text-slate-700">
          External Link (Optional)
        </label>
        <input
          id="external_link"
          name="external_link"
          type="url"
          defaultValue={blog?.external_link}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all"
          placeholder="https://example.com/blog-post"
        />
        <p className="text-xs text-slate-500">Leave empty for internal blog posts</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FileText size={18} />
              <span>{blog ? "Update Blog Post" : "Create Blog Post"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

