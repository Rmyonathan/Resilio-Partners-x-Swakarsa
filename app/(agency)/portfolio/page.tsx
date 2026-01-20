import { Footer } from "../../components/agency/SectionComponents";
import { ExternalLink, Sparkles, Heart, Gamepad2, TrendingUp, Award, Building2, ShoppingCart, UtensilsCrossed, Database, MessageSquare, Package } from "lucide-react";
import Link from "next/link";
import PortfolioImage from "./PortfolioImage";
import AtomBackground from "@/app/components/agency/AtomBackground";

export const metadata = {
  title: "Products & Portfolio | Resilio Partners",
  description: "Showcase of successful launches: OneClick Smart Resume, Hotel Dwipa Management System, Maju Mobilindo CRM, and more.",
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
      image: "/images/oneclick.png",
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
      id: "hotel-dwipa",
      title: "Hotel Dwipa Management System",
      category: "Management System",
      description: "Integrated hotel management system covering booking management, front desk operations, housekeeping, billing, and reporting. This system improves hotel operational efficiency by 40% and significantly enhances guest experience.",
      tagline: "Complete hotel operations management platform",
      externalLink: "#",
      image: "/portfolio/Hotel Dwipa Management System.jpeg",
      highlights: [
        "Booking & Reservation Management",
        "Front Desk Operations",
        "Housekeeping Coordination",
        "Billing & Reporting Analytics"
      ],
      stats: {
        efficiency: "40% Improvement",
        year: "2024",
      },
      icon: Building2,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      id: "maju-mobilindo",
      title: "Maju Mobilindo CRM System",
      category: "CRM System",
      description: "Custom CRM system for used car dealership with lead management, inventory tracking, customer follow-up, and sales analytics features. This system helps increase lead to sales conversion rate by 35% and optimizes inventory management.",
      tagline: "Used car dealership CRM with advanced lead management",
      externalLink: "#",
      image: "/portfolio/Maju Mobilindo.jpeg",
      highlights: [
        "Lead Management & Tracking",
        "Inventory Management System",
        "Customer Follow-Up Automation",
        "Sales Analytics Dashboard"
      ],
      stats: {
        conversion: "35% Increase",
        year: "2024",
      },
      icon: ShoppingCart,
      gradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400"
    },
    {
      id: "restaurant-pos",
      title: "Restaurant POS System",
      category: "POS System",
      description: "Complete Point of Sale system for restaurants with order management, kitchen display system, inventory tracking, and comprehensive reporting. This system reduces customer waiting time by 50% and increases table turnover rate.",
      tagline: "Full-service restaurant POS with kitchen integration",
      externalLink: "#",
      image: "/images/Point of Sale (POS).jpg",
      highlights: [
        "Order Management System",
        "Kitchen Display Integration",
        "Inventory Tracking",
        "Comprehensive Reporting"
      ],
      stats: {
        efficiency: "50% Faster",
        year: "2024",
      },
      icon: UtensilsCrossed,
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      textColor: "text-red-400"
    },
    {
      id: "alumka-lampung",
      title: "Alumka Lampung ERP System",
      category: "ERP System",
      description: "Enterprise Resource Planning system for aluminum manufacturing company with production, inventory, accounting, HR, and business intelligence modules. This system integrates all departments in one efficient platform.",
      tagline: "Enterprise-wide resource planning and management",
      externalLink: "#",
      image: "/portfolio/Alumka.jpeg",
      highlights: [
        "Production Management",
        "Inventory & Accounting",
        "HR Management Module",
        "Business Intelligence Dashboard"
      ],
      stats: {
        integration: "Full ERP",
        year: "2023",
      },
      icon: Database,
      gradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400"
    },
    {
      id: "ai-faq-system",
      title: "AI FAQ Chatbot System",
      category: "AI System",
      description: "AI-based chatbot system that can understand natural language questions in Indonesian and provide accurate answers. Reduces customer service workload by 70% with response time under 2 seconds.",
      tagline: "Intelligent customer support automation",
      externalLink: "#",
      image: "/images/Integrasi AI & Machine Learning.jpg",
      highlights: [
        "Natural Language Processing",
        "Multi-Language Support",
        "Real-Time Response",
        "Integration with Helpdesk Systems"
      ],
      stats: {
        reduction: "70% Workload",
        year: "2024",
      },
      icon: MessageSquare,
      gradient: "from-teal-500/20 to-emerald-500/20",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-400"
    },
    {
      id: "web-scraping",
      title: "Web Scraping & Data Aggregation Platform",
      category: "Data Analytics",
      description: "Automatic price and competitor monitoring platform with web scraping technology. Collects and analyzes data from various e-commerce sites for pricing strategy and market analysis. Reduces manual data collection time by 90%.",
      tagline: "Automated competitor monitoring and market intelligence",
      externalLink: "#",
      image: "/images/Web Scraping & Data Aggregation.jpg",
      highlights: [
        "Automated Data Collection",
        "Real-Time Price Monitoring",
        "Market Trend Analysis",
        "Competitive Intelligence Dashboard"
      ],
      stats: {
        efficiency: "90% Time Saved",
        year: "2024",
      },
      icon: Package,
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      id: "omtal",
      title: "Omtal MMORPG",
      category: "Gaming Platform",
      description: "A complex MMORPG (Massively Multiplayer Online Role-Playing Game) that generated $1.3M in revenue, demonstrating our ability to deliver sophisticated, high-performance gaming platforms with complex backend systems, real-time multiplayer capabilities, and scalable infrastructure.",
      tagline: "$1.3M revenue game - proof of complex product delivery",
      externalLink: "#",
      image: "https://placehold.co/800x400/0ea5e9/0c4a6e?text=Omtal+MMORPG+Gaming+Platform",
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
    <main className="min-h-screen bg-white relative overflow-hidden">
      <AtomBackground />
      {/* Header */}
      <section className="pt-32 pb-12 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Products & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#0054A6] to-[#00A651]">Portfolio</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Showcase of successful launches to establish credibility and demonstrate our technical expertise
        </p>
      </section>

      {/* Products Grid */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, idx) => {
              const IconComponent = product.icon;
              return (
                <div
                  key={product.id}
                  className={`bg-gradient-to-br from-slate-900 ${product.gradient} to-slate-900 border ${product.borderColor} rounded-3xl p-8 md:p-12 hover:scale-[1.02] transition-all duration-300 group overflow-hidden relative`}
                >
                  {/* Product Image */}
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 border border-slate-800">
                    {product.externalLink && product.externalLink !== "#" ? (
                      <a href={product.externalLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <PortfolioImage 
                          src={product.image} 
                          alt={product.title}
                          title={product.title}
                        />
                      </a>
                    ) : (
                      <PortfolioImage 
                        src={product.image} 
                        alt={product.title}
                        title={product.title}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${product.textColor} border ${product.borderColor} backdrop-blur-md bg-black/40 pointer-events-none`}>
                      {product.category}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Icon and Basic Info */}
                    <div className="md:w-1/3">
                      <div className={`w-24 h-24 rounded-2xl border ${product.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm`} style={{ backgroundColor: product.textColor.includes('indigo') ? 'rgba(99, 102, 241, 0.2)' : product.textColor.includes('blue') ? 'rgba(59, 130, 246, 0.2)' : product.textColor.includes('amber') ? 'rgba(245, 158, 11, 0.2)' : product.textColor.includes('red') ? 'rgba(239, 68, 68, 0.2)' : product.textColor.includes('purple') ? 'rgba(168, 85, 247, 0.2)' : product.textColor.includes('teal') ? 'rgba(20, 184, 166, 0.2)' : product.textColor.includes('cyan') ? 'rgba(6, 182, 212, 0.2)' : 'rgba(99, 102, 241, 0.2)' }}>
                        <IconComponent className={product.textColor} size={48} />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-3">{product.title}</h2>
                      <p className={`text-sm font-semibold ${product.textColor} mb-4 uppercase tracking-wider`}>
                        {product.category}
                      </p>
                      {product.externalLink && product.externalLink !== "#" ? (
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
              <p className="text-slate-300 leading-relaxed mb-6">
                From AI-powered platforms to complex management systems, our portfolio demonstrates our ability to deliver sophisticated solutions that drive real business results. Every project is scoped personally by Jon and delivered with quality guaranteed by Jethro's technical leadership.
              </p>
              <p className="text-slate-400 text-sm italic">
                This represents a selection of our completed projects. For a complete list of our portfolio, please contact us.
              </p>
            </div>
          </div>

          {/* Complete Portfolio CTA */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 max-w-2xl mx-auto">
              <Package className="text-indigo-400 mx-auto mb-3" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Complete Portfolio Available</h3>
              <p className="text-slate-400 text-sm mb-4">
                We've completed numerous projects across various industries. Contact us to see our full portfolio and discuss how we can help with your project.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 hover:border-indigo-500/50 transition-all font-semibold text-sm"
              >
                Contact Us for Complete List
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
