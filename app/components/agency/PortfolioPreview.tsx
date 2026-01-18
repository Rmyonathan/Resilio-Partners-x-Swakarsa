"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PortfolioPreview() {
  // Use specific projects: OneClick, Hotel Dwipa (or another), and Omtal MMORPG
  const featuredProjects = [
    {
      id: "oneclick",
      title: "OneClick Smart Resume",
      category: "AI-Powered Platform",
      shortDescription: "An AI-powered resume optimization platform that helps job seekers create standout resumes. Built during Jon's job search journey, this platform combines advanced AI with practical career guidance.",
      image: "/images/oneclick.png",
      client: "OneClick Smart Resume",
      externalLink: "https://oneclicksmartresume.com"
    },
    {
      id: "hotel-dwipa",
      title: "Hotel Dwipa Management System",
      category: "Management System",
      shortDescription: "Integrated hotel management system covering booking management, front desk operations, housekeeping, billing, and reporting. This system improves hotel operational efficiency by 40%.",
      image: "/portfolio/Hotel Dwipa Management System.jpeg",
      client: "Hotel Dwipa Group",
      externalLink: "#"
    },
    {
      id: "omtal",
      title: "Omtal MMORPG",
      category: "Gaming Platform",
      shortDescription: "A complex MMORPG (Massively Multiplayer Online Role-Playing Game) that generated $1.3M in revenue, demonstrating our ability to deliver sophisticated, high-performance gaming platforms.",
      image: "https://placehold.co/800x400/0ea5e9/0c4a6e?text=Omtal+MMORPG+Gaming+Platform",
      client: "Omtal Gaming",
      externalLink: "#"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A glimpse into our recent work—solutions that drive real business impact
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project: any, index: number) => {
            // Assign colors based on index: Blue, Green, Yellow
            const colors = [
              { border: 'border-[#0054A6]/50', hoverBorder: 'hover:border-[#0054A6]', shadow: 'hover:shadow-[0_0_30px_rgba(0,84,166,0.3)]', badge: 'bg-[#0054A6]/80 border-[#0054A6]/50', text: 'text-[#0054A6]' },
              { border: 'border-[#00A651]/50', hoverBorder: 'hover:border-[#00A651]', shadow: 'hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]', badge: 'bg-[#00A651]/80 border-[#00A651]/50', text: 'text-[#00A651]' },
              { border: 'border-[#FFD400]/50', hoverBorder: 'hover:border-[#FFD400]', shadow: 'hover:shadow-[0_0_30px_rgba(255,212,0,0.3)]', badge: 'bg-[#FFD400]/80 border-[#FFD400]/50', text: 'text-[#FFD400]' },
            ];
            const colorScheme = colors[index % 3];
            
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 border ${colorScheme.border} ${colorScheme.hoverBorder} rounded-2xl overflow-hidden transition-all duration-300 ${colorScheme.shadow}`}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={project.image || "/portfolio/placeholder.jpg"}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorScheme.badge} text-white backdrop-blur-sm border`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD400] transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-500">{project.client}</span>
                  {project.externalLink && project.externalLink !== "#" ? (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 ${colorScheme.text} text-sm font-semibold hover:opacity-80 transition-opacity`}
                    >
                      <span>View</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div className={`flex items-center gap-2 ${colorScheme.text} text-sm font-semibold`}>
                      <span>View</span>
                      <ExternalLink size={14} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 group text-[#FFD400] hover:text-[#00A651] font-semibold text-lg transition-colors"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
