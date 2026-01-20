"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function PortfolioPreview() {
  const [docaAnimation, setDocaAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/doca.json')
      .then(res => res.json())
      .then(data => setDocaAnimation(data))
      .catch(err => console.error('Failed to load doca animation:', err));
  }, []);
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
    <section className="py-24 relative z-10 overflow-hidden">
      {/* Doca Animation Background */}
      {docaAnimation && (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 -z-10 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <Lottie 
              animationData={docaAnimation} 
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        </div>
      )}
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A glimpse into our recent work—solutions that drive real business impact
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project: any, index: number) => {
            const isFirstCard = index === 0;
            
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                isFirstCard 
                  ? 'bg-white border border-slate-200 hover:border-blue-500 shadow-md hover:shadow-2xl' 
                  : 'bg-white border border-slate-200 hover:border-blue-500 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={project.image || "/portfolio/placeholder.jpg"}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* Category Badge - Floating */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
                  {project.shortDescription}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">{project.client}</span>
                  {project.externalLink && project.externalLink !== "#" ? (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors"
                    >
                      <span>View Project</span>
                      <ExternalLink size={14} className="text-blue-600" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold opacity-50 cursor-not-allowed">
                      <span>Coming Soon</span>
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
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
