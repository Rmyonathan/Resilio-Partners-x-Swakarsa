"use client";

import { useState } from "react";
import { Footer } from "../../../components/agency/SectionComponents";
import { FileText, ArrowLeft, Users, Code, Palette } from "lucide-react";
import Link from "next/link";
import CVModal from "./CVModal";
import TeamConstellation from "../../../components/visuals/TeamConstellation";

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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/30 relative overflow-hidden">
      {/* Background Animation */}
      <TeamConstellation />
      
      <CVModal
        isOpen={!!selectedCV}
        onClose={handleCloseModal}
        memberName={selectedCV?.name || ""}
        memberRole={selectedCV?.role || ""}
        cvFile={selectedCV?.cvFile || ""}
      />
      
      <section className="pt-32 pb-24 container mx-auto px-6 relative z-10">
        <Link 
          href="/team" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Team
        </Link>

        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-6">
            <Users className="text-blue-600" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700">
            Our Team CVs
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explore the qualifications and expertise of our talented team members across various specialties. All resumes are ATS-compliant and follow US professional standards.
          </p>
        </div>

        {/* IT / Development Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Code className="text-blue-600" size={24} />
            IT / Development Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 transition-all group shadow-md hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded font-semibold">
                    {member.experience}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-600 mb-6">{member.role}</p>

                <div className="pt-6 border-t-2 border-slate-200">
                  <button
                    onClick={() => handleViewCV(member)}
                    className="flex items-center justify-center w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all group/btn font-semibold"
                  >
                    <span className="flex items-center gap-2 text-sm">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Palette className="text-blue-600" size={24} />
            Digital Marketing Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 transition-all group shadow-md hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded font-semibold">
                    {member.experience}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-600 mb-6">{member.role}</p>

                <div className="pt-6 border-t-2 border-slate-200">
                  <button
                    onClick={() => handleViewCV(member)}
                    className="flex items-center justify-center w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all group/btn font-semibold"
                  >
                    <span className="flex items-center gap-2 text-sm">
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

