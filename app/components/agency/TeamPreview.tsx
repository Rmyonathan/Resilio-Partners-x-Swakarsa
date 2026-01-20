"use client";

import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function TeamPreview() {
  const [connectingIdeasAnimation, setConnectingIdeasAnimation] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/Connecting Ideas.json')
      .then(res => res.json())
      .then(data => setConnectingIdeasAnimation(data))
      .catch(err => console.error('Failed to load connecting ideas animation:', err));
  }, []);
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
    <section className="py-24 relative z-10 overflow-hidden">
      {/* Connecting Ideas Animation Background */}
      {connectingIdeasAnimation && (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 -z-10 pointer-events-none">
          <Lottie 
            animationData={connectingIdeasAnimation} 
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700">
            Meet Our Team
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The talented professionals behind every successful project
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
          {featuredMembers.map((member: any, index: number) => {
            return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-8 text-center transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-blue-500 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-blue-600 font-bold uppercase tracking-wide mb-4">
                {member.role}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                {member.description}
              </p>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <span>Meet the Full Team</span>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
