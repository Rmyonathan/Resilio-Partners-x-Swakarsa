import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Calendar, Eye } from "lucide-react";
import { revalidatePath } from "next/cache";
import { BlogDeleteForm } from "./actions";

async function togglePublish(postId: string, currentStatus: string) {
  "use server";
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return;

  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  
  await prisma.blogPost.update({
    where: { id: postId },
    data: { 
      status: newStatus,
      publishedAt: newStatus === 'published' ? new Date() : null
    }
  });
  revalidatePath('/admin/blogs');
}

export default async function BlogsPage() {
  const session = await auth();
  const user = session?.user as any;
  
  if (!session || user?.role !== 'ADMIN') {
    redirect('/login');
  }

  const blogPosts = await prisma.blogPost.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  });

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Blog Management</h1>
          <p className="text-slate-600 mt-1">Create and manage blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
        >
          <Plus size={20} />
          New Blog Post
        </Link>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
        {blogPosts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 mb-4">No blog posts yet.</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <Plus size={18} />
              Create your first blog post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'published'
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {post.status === 'published' ? "Published" : "Draft"}
                      </span>
                    </div>
                    {post.excerpt && (
                      <p className="text-slate-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      {post.author && (
                        <span>By {post.author.name || post.author.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={togglePublish.bind(null, post.id, post.status)}>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          post.status === 'published'
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        }`}
                      >
                        {post.status === 'published' ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/blogs/${post.id}/edit`}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <BlogDeleteForm blogId={post.id} blogTitle={post.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

