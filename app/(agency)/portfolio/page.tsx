import { Footer } from "../../components/agency/SectionComponents";
import { ExternalLink, Sparkles, Heart, Gamepad2, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Products & Portfolio | Resilio Partners",
  description: "Showcase of successful launches: OneClick Smart Resume, Oakland Thrive Platform, and Omtal MMORPG.",
};

export default function PortfolioPage() {
  const products = [
    {
      id: "oneclick",
      title: "OneClick Smart Resume",
      category: "AI-Powered Platform",
      description: "An AI-powered resume optimization platform that helps job seekers create standout resumes. Built during Jon's job search journey, this platform combines advanced AI with practical career guidance to help users land their dream jobs.",
      tagline: "AI-powered resume optimization",
      externalLink: "https://oneclicksmartresume.com",
      image: "/images/oneclick-resume.jpg", // TODO: Add actual image
      highlights: [
        "AI-Powered Content Optimization",
        "ATS-Friendly Formatting",
        "Real-Time Feedback & Suggestions",
        "Industry-Specific Templates"
      ],
      stats: {
        users: "10K+",
        satisfaction: "95%",
      },
      icon: Sparkles,
      gradient: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-400"
    },
    {
      id: "oakland-thrive",
      title: "Oakland Thrive Platform",
      category: "Health & Wellness Platform",
      description: "A comprehensive burnout prevention system designed to help organizations support employee mental health and wellness. Features include stress tracking, wellness resources, and organizational health analytics.",
      tagline: "Burnout prevention system",
      externalLink: "#",
      comingSoon: true,
      image: "/images/oakland-thrive.jpg", // TODO: Add actual image
      highlights: [
        "Real-Time Stress Tracking",
        "Wellness Resource Library",
        "Organizational Health Analytics",
        "Employee Support Tools"
      ],
      stats: {
        organizations: "Coming Soon",
      },
      icon: Heart,
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-400"
    },
    {
      id: "omtal",
      title: "Omtal MMORPG",
      category: "Gaming Platform",
      description: "A complex MMORPG (Massively Multiplayer Online Role-Playing Game) that generated $1.3M in revenue, demonstrating our ability to deliver sophisticated, high-performance gaming platforms with complex backend systems, real-time multiplayer capabilities, and scalable infrastructure.",
      tagline: "$1.3M revenue game - proof of complex product delivery",
      externalLink: "#",
      image: "/images/omtal-game.jpg", // TODO: Add actual image
      highlights: [
        "Complex Backend Systems",
        "Real-Time Multiplayer",
        "Scalable Infrastructure",
        "Monetization Systems"
      ],
      stats: {
        revenue: "$1.3M",
        players: "50K+",
      },
      icon: Gamepad2,
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-400"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Products & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Portfolio</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Showcase of successful launches to establish credibility and demonstrate our technical expertise
        </p>
      </section>

      {/* Products Grid */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-1 gap-12">
            {products.map((product, idx) => {
              const IconComponent = product.icon;
              return (
                <div
                  key={product.id}
                  className={`bg-gradient-to-br from-slate-900 ${product.gradient} to-slate-900 border ${product.borderColor} rounded-3xl p-8 md:p-12 hover:scale-[1.02] transition-all duration-300 group overflow-hidden relative`}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Icon and Basic Info */}
                    <div className="md:w-1/3">
                      <div className={`w-24 h-24 rounded-2xl bg-${product.textColor.replace('text-', '')}/20 border ${product.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <IconComponent className={product.textColor} size={48} />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-3">{product.title}</h2>
                      <p className={`text-sm font-semibold ${product.textColor} mb-4 uppercase tracking-wider`}>
                        {product.category}
                      </p>
                      {product.comingSoon ? (
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                          Coming Soon
                        </span>
                      ) : product.externalLink !== "#" ? (
                        <a
                          href={product.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${product.textColor} border ${product.borderColor} hover:opacity-80 transition-all`}
                        >
                          Visit Site <ExternalLink size={16} />
                        </a>
                      ) : null}
                    </div>

                    {/* Right: Description and Details */}
                    <div className="md:w-2/3">
                      <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        {product.description}
                      </p>

                      {/* Stats */}
                      {product.stats && (
                        <div className="flex flex-wrap gap-4 mb-6">
                          {Object.entries(product.stats).map(([key, value]) => (
                            <div key={key} className="bg-black/40 rounded-xl p-4 border border-slate-800">
                              <div className="text-2xl font-bold text-white mb-1">{value}</div>
                              <div className="text-xs text-slate-400 uppercase tracking-wider">{key}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {product.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Award className={`${product.textColor} flex-shrink-0 mt-0.5`} size={16} />
                            <span className="text-sm text-slate-300">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tagline */}
                      <div className="pt-6 border-t border-slate-800">
                        <p className="text-sm text-slate-400 italic">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Credibility Statement */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8">
              <TrendingUp className="text-indigo-400 mx-auto mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">Proven Track Record</h3>
              <p className="text-slate-300 leading-relaxed">
                From AI-powered platforms to complex gaming systems generating millions in revenue, our portfolio demonstrates our ability to deliver sophisticated solutions that drive real business results. Every project is scoped personally by Jon and delivered with quality guaranteed by Jethro's technical leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
