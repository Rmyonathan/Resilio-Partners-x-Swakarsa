import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { Footer } from "@/app/components/agency/SectionComponents";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FlowingBackground from "@/app/components/agency/FlowingBackground";

export const dynamic = 'force-dynamic';

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Fetch blog post from database
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post) {
    notFound();
  }

  // Only show published posts
  if (post.status !== 'published') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <FlowingBackground />
      
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-24 pb-8 relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>
      </div>

      {/* Blog Post Content */}
      <article className="pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4 text-sm text-slate-600">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </span>
              {post.author && (
                <>
                  <span>•</span>
                  <span>By {post.author.name || post.author.email}</span>
                </>
              )}
              {post.source && (
                <>
                  <span>•</span>
                  <span>{post.source}</span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.coverImageUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg bg-slate-100">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}