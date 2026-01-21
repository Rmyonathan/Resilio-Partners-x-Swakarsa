import { createBlogPost } from "@/app/lib/actions";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BlogForm } from "../form";

export default function NewBlogPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const result = await createBlogPost(formData);
    if (result.success) {
      redirect("/admin/blogs");
    }
    return result;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 min-h-screen bg-white">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8 md:p-10">
        <div className="mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Plus size={28} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Create New Blog Post</h1>
              <p className="text-slate-600 mt-1">Write and publish a new blog post to share with your audience.</p>
            </div>
          </div>
        </div>

        <BlogForm action={handleSubmit} />
      </div>
    </div>
  );
}

