import { prisma } from "@/app/lib/prisma";
import { updateBlogPost } from "@/app/lib/actions";
import { ArrowLeft, Edit2 } from "lucide-react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { BlogForm } from "../../form";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const user = session?.user as any;
  
  if (!session || user?.role !== 'ADMIN') {
    redirect('/login');
  }

  const { id } = await params;
  const blog = await prisma.blogPost.findUnique({
    where: { id }
  });

  if (!blog) {
    notFound();
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    formData.append('id', id);
    const result = await updateBlogPost(formData);
    if (result.success) {
      redirect("/admin/blogs");
    }
    return result;
  }

  // Map Prisma fields to form fields
  const blogFormData = {
    id: blog.id,
    title: blog.title,
    excerpt: blog.excerpt || '',
    content: blog.content || '',
    cover_image_url: blog.coverImageUrl || '',
    status: blog.status || 'draft',
    source: blog.source || 'Resilio',
    external_link: blog.externalLink || '',
  };

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
              <Edit2 size={28} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Edit Blog Post</h1>
              <p className="text-slate-600 mt-1">Update blog post information.</p>
            </div>
          </div>
        </div>

        <BlogForm action={handleSubmit} blog={blogFormData} />
      </div>
    </div>
  );
}

