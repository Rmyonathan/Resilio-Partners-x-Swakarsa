import { Footer } from "../../../components/agency/SectionComponents";
import { FileText, Download, ArrowLeft, ExternalLink, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Team CVs | Resilio Partners",
  description: "View CVs and qualifications of our team members.",
};

// Team CV data - matches the actual CV files in public/cv folder
const teamCVs = [
  {
    id: "ahmad",
    name: "Ahmad Musyaari Rasyid",
    role: "Digital Strategist",
    experience: "5+ Years",
    cvFile: "/cv/CV AHMAD MUSYAARI RASYID 2025.pdf"
  },
  {
    id: "taufiq",
    name: "M. Taufiq Hidayat",
    role: "Social Media Manager",
    experience: "3+ Years",
    cvFile: "/cv/CV M.TAUFIQ HIDAYAT.pdf"
  },
  {
    id: "reynardi",
    name: "Reynardi Gunawan",
    role: "SEO Specialist",
    experience: "6+ Years",
    cvFile: "/cv/CV Reynardi Gunawan.pdf"
  },
  {
    id: "yansen",
    name: "Gregorio Yansen",
    role: "Content Manager",
    experience: "4+ Years",
    cvFile: "/cv/CV Yansen.pdf"
  },
  {
    id: "richie",
    name: "Richie Ardianto",
    role: "PPC Specialist",
    experience: "4+ Years",
    cvFile: "/cv/Richie Ardianto CV.pdf"
  },
  {
    id: "asep",
    name: "Asep",
    role: "Team Member",
    experience: "Experience",
    cvFile: "/cv/cv asep.pdf"
  }
];

export default function TeamCVsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
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
            Explore the qualifications and expertise of our talented team members across various specialties.
          </p>
        </div>

        {/* Team Members CVs */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="text-cyan-400" size={24} />
            Digital Marketing Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamCVs.map((member) => (
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
                  <a
                    href={member.cvFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 rounded-xl bg-indigo-600/10 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all group/btn"
                  >
                    <span className="flex items-center gap-2 font-medium text-sm">
                      <FileText size={16} />
                      View CV
                    </span>
                    <ExternalLink size={14} className="opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
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

