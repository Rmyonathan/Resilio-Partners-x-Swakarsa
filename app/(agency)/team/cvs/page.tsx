"use client";

import { useState } from "react";
import { Footer } from "../../../components/agency/SectionComponents";
import { FileText, ArrowLeft, Users, Code, Palette } from "lucide-react";
import Link from "next/link";
import CVModal from "./CVModal";

// Marketing Team CV data - ATS-compliant resumes
const marketingTeam = [
  {
    id: "ahmad",
    name: "Ahmad Musyaari Rasyid",
    role: "Graphic Designer",
    experience: "5+ Years",
    cvFile: "/cv/ATS_RESUMES/AHMAD_MUSYAARI_RASYID_ATS.txt"
  },
  {
    id: "taufiq",
    name: "M. Taufiq Hidayat",
    role: "Graphic Designer / Visual Communication",
    experience: "3+ Years",
    cvFile: "/cv/ATS_RESUMES/TAUFIQ_HIDAYAT_ATS.txt"
  },
  {
    id: "yansen",
    name: "Gregorio Yansen",
    role: "Event Management Professional",
    experience: "4+ Years",
    cvFile: "/cv/ATS_RESUMES/GREGORIO_YANSEN_ATS.txt"
  },
  {
    id: "richie",
    name: "Richie Ardianto",
    role: "Social Media Specialist / Digital Marketer",
    experience: "4+ Years",
    cvFile: "/cv/ATS_RESUMES/RICHIE_ARDIANTO_ATS.txt"
  }
];

// IT / Development Team CV data - ATS-compliant resumes
const itTeam = [
  {
    id: "yonathan",
    name: "Yonathan Tanuwijaya",
    role: "Software Engineer / Full Stack Developer",
    experience: "5+ Years",
    cvFile: "/cv/ATS_RESUMES/YONATHAN_TANUWIJAYA_ATS.txt"
  },
  {
    id: "jethro",
    name: "Jethro Elijah Lim",
    role: "Digital Marketing Technologist / Full Stack Developer",
    experience: "2+ Years",
    cvFile: "/cv/ATS_RESUMES/JETHRO_ELIJAH_LIM_ATS.txt"
  },
  {
    id: "daniel",
    name: "Daniel Lim",
    role: "Computer Science / Machine Learning / Full Stack",
    experience: "2+ Years",
    cvFile: "/cv/ATS_RESUMES/DANIEL_LIM_ATS.txt"
  },
  {
    id: "reynardi",
    name: "Reynardi Gunawan",
    role: "IT / Social Media / Management",
    experience: "6+ Years",
    cvFile: "/cv/ATS_RESUMES/REYNARDI_GUNAWAN_ATS.txt"
  },
  {
    id: "asep",
    name: "Asep Saefuddin",
    role: "Fullstack Software Developer",
    experience: "4+ Years",
    cvFile: "/cv/ATS_RESUMES/ASEP_SAEFUDDIN_ATS.txt"
  }
];

export default function TeamCVsPage() {
  const [selectedCV, setSelectedCV] = useState<{ name: string; role: string; cvFile: string } | null>(null);

  const handleViewCV = (member: { name: string; role: string; cvFile: string }) => {
    setSelectedCV(member);
  };

  const handleCloseModal = () => {
    setSelectedCV(null);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <CVModal
        isOpen={!!selectedCV}
        onClose={handleCloseModal}
        memberName={selectedCV?.name || ""}
        memberRole={selectedCV?.role || ""}
        cvFile={selectedCV?.cvFile || ""}
      />
      
      <section className="pt-32 pb-24 container mx-auto px-6">
        <Link 
          href="/team" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Team
        </Link>

        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
            <Users className="text-indigo-400" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Our Team CVs
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Explore the qualifications and expertise of our talented team members across various specialties. All resumes are ATS-compliant and follow US professional standards.
          </p>
        </div>

        {/* IT / Development Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Code className="text-blue-400" size={24} />
            IT / Development Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itTeam.map((member) => (
              <div
                key={member.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-500 bg-black/40 px-2 py-1 rounded">
                    {member.experience}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-400 mb-6">{member.role}</p>

                <div className="pt-6 border-t border-slate-800">
                  <button
                    onClick={() => handleViewCV(member)}
                    className="flex items-center justify-center w-full p-3 rounded-xl bg-blue-600/10 text-blue-300 hover:bg-blue-600 hover:text-white transition-all group/btn"
                  >
                    <span className="flex items-center gap-2 font-medium text-sm">
                      <FileText size={16} />
                      View Resume
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Team */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Palette className="text-cyan-400" size={24} />
            Digital Marketing Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingTeam.map((member) => (
              <div
                key={member.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-500 bg-black/40 px-2 py-1 rounded">
                    {member.experience}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-400 mb-6">{member.role}</p>

                <div className="pt-6 border-t border-slate-800">
                  <button
                    onClick={() => handleViewCV(member)}
                    className="flex items-center justify-center w-full p-3 rounded-xl bg-indigo-600/10 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all group/btn"
                  >
                    <span className="flex items-center gap-2 font-medium text-sm">
                      <FileText size={16} />
                      View Resume
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

