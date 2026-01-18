import { Footer } from "../../components/agency/SectionComponents";
import { Calendar, ExternalLink as ExternalLinkIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import AtomBackground from "@/app/components/agency/AtomBackground";
import { getBlogPosts } from "@/app/lib/actions";

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
    <main className="min-h-screen text-white selection:bg-[#0054A6]/30 relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center, rgba(255, 212, 0, 0.03) 0%, rgba(10, 16, 37, 0.6) 50%, rgba(0, 0, 0, 1) 100%)',
    }}>
      <AtomBackground />
      
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A651] to-[#0054A6]">Insights</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Stay updated with industry trends, best practices, and expert advice from Resilio Partners and Jon Irwin
        </p>
      </section>

      {/* Blog Posts */}
      <section className="py-16 pb-24">
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

                // Source Badge Color - use brand colors
                const isMedium = post.source === "Jon's Medium";
                const isWix = post.source === "Resilio Blog";
                let badgeColor = "bg-[#0054A6]/20 text-[#0054A6] border-[#0054A6]/30";
                if (isMedium) {
                  badgeColor = "bg-[#FFD400]/20 text-[#FFD400] border-[#FFD400]/30";
                } else if (isWix) {
                  badgeColor = "bg-[#00A651]/20 text-[#00A651] border-[#00A651]/30";
                }

                return (
                  <Component
                    key={post.id || post.slug}
                    {...linkProps}
                    className="group block cursor-pointer bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#FFD400]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,212,0,0.2)]"
                  >
                    {/* Cover Image */}
                    {post.cover_image_url && (
                      <div className="h-48 relative overflow-hidden bg-slate-800">
                        <img
                          src={post.cover_image_url || "/assets/story-placeholder.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                        
                        {/* Source Badge */}
                        <div className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}>
                          {post.source}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        {publishedDate && (
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Calendar className="w-4 h-4 text-[#0054A6]" />
                            <span>{publishedDate}</span>
                          </div>
                        )}
                        {isExternal && (
                          <span className="text-xs text-[#00A651] flex items-center gap-1">
                            External
                            <ExternalLinkIcon size={12} />
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FFD400] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <span className="text-xs text-slate-500">
                          {post.source}
                        </span>
                        
                        <div className="flex items-center gap-2 text-[#0054A6] hover:text-[#FFD400] transition-colors font-semibold text-sm">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

