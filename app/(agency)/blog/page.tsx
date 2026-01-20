import { Footer } from "../../components/agency/SectionComponents";
import { Calendar, ExternalLink as ExternalLinkIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/app/lib/actions";
import FlowingBackground from "../../components/agency/FlowingBackground";

export const metadata = {
  title: "Blog | Resilio Partners",
  description: "Stay updated with industry trends, best practices, and expert advice from Resilio Partners and Jon Irwin.",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <FlowingBackground />
      
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-blue-700">
          Latest Insights
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Stay updated with industry trends, best practices, and expert advice from Resilio Partners and Jon Irwin
        </p>
      </section>

      {/* Blog Posts */}
      <section className="py-16 pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl text-slate-400 mb-6">No blog posts available yet.</p>
              <p className="text-slate-500">Check back soon for updates.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, idx: number) => {
                const publishedDate = post.published_at
                  ? formatDate(post.published_at)
                  : "";

                // External links (Wix/Medium) vs Internal
                const isExternal = !!post.external_link;
                const href = isExternal ? post.external_link : `/blog/${post.slug}`;
                const Component = isExternal ? "a" : Link;
                const linkProps = isExternal 
                  ? { href, target: "_blank", rel: "noopener noreferrer" }
                  : { href };

                return (
                  <Component
                    key={post.id || post.slug}
                    {...linkProps}
                    className="group block cursor-pointer bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-500 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    {/* Cover Image */}
                    {post.cover_image_url && (
                      <div className="h-48 relative overflow-hidden bg-slate-100">
                        <img
                          src={post.cover_image_url || "/assets/story-placeholder.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                        />
                        
                        {/* Source Badge */}
                        <div className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border bg-blue-600 text-white">
                          {post.source}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        {publishedDate && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span>{publishedDate}</span>
                          </div>
                        )}
                        {isExternal && (
                          <span className="text-xs text-blue-600 flex items-center gap-1">
                            External
                            <ExternalLinkIcon size={12} className="text-blue-600" />
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <span className="text-xs text-slate-500">
                          {post.source}
                        </span>
                        
                        <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold text-sm">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Component>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

