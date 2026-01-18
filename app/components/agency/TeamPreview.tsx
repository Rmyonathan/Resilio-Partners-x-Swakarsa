"use client";

import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TeamPreview() {
  // Use the same data as /team page (Jon Irwin and Jethro Lim)
  const featuredMembers = [
    {
      id: "jon-irwin",
      name: "Jon Irwin",
      role: "Founder & Principal Consultant",
      image: "/images/jon_irwin.jpg",
      description: "PMP certified, Air Force veteran with 20+ years of project management experience across top-tier organizations including Accenture, UAW Trust, and HTC Global. Jon personally scopes every project and ensures delivery excellence."
    },
    {
      id: "jethro-lim",
      name: "Jethro Lim",
      role: "Chief Operating Officer",
      image: "/images/jethro.jpeg",
      description: "With 2+ years managing development teams, Jethro oversees all technical delivery and ensures quality across every project. His expertise spans full-stack development, AI/ML integration, and workflow automation."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Meet Our Team
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            The talented professionals behind every successful project
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
          {featuredMembers.map((member: any, index: number) => {
            // Assign colors: Blue for first, Green for second
            const colors = [
              { border: 'border-[#0054A6]/50', hoverBorder: 'hover:border-[#0054A6]', shadow: 'hover:shadow-[0_0_30px_rgba(0,84,166,0.3)]', avatarBorder: 'border-[#0054A6]/30', hoverAvatarBorder: 'group-hover:border-[#0054A6]/60', roleColor: 'text-[#0054A6]' },
              { border: 'border-[#00A651]/50', hoverBorder: 'hover:border-[#00A651]', shadow: 'hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]', avatarBorder: 'border-[#00A651]/30', hoverAvatarBorder: 'group-hover:border-[#00A651]/60', roleColor: 'text-[#00A651]' },
            ];
            const colorScheme = colors[index % 2];
            
            return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 border ${colorScheme.border} ${colorScheme.hoverBorder} rounded-2xl p-6 text-center transition-all duration-300 ${colorScheme.shadow}`}
            >
              {/* Avatar */}
              <div className={`relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 ${colorScheme.avatarBorder} ${colorScheme.hoverAvatarBorder} transition-colors`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFD400] transition-colors">
                {member.name}
              </h3>
              <p className={`text-sm ${colorScheme.roleColor} font-semibold mb-3`}>
                {member.role}
              </p>
              <p className="text-xs text-slate-400 line-clamp-3">
                {member.description?.substring(0, 150)}
              </p>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-3 group text-[#FFD400] hover:text-[#00A651] font-semibold text-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Meet the Full Team</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
