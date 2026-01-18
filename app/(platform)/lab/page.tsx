import { getClientProjects } from "@/app/lib/actions";
import { Plus, Folder, Calendar, Users, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

// Helper format uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default async function LabDashboard() {
  // 1. Ambil Data Project dari Database
  const projects = await getClientProjects();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">The Lab</h1>
          <p className="text-slate-300 mt-2">Manage your active projects and drafts.</p>
        </div>
        <Link 
          href="/lab/draft" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          // EMPTY STATE
          <div className="col-span-full py-20 text-center bg-slate-900/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-indigo-500/30">
             <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                <Folder className="text-indigo-400" size={32} />
             </div>
             <h3 className="text-lg font-bold text-white">No Projects Yet</h3>
             <p className="text-slate-300 mb-6">Start drafting your dream team to begin.</p>
             <Link href="/lab/draft" className="text-indigo-400 font-bold hover:text-cyan-400 transition-colors">
               Go to Drafting Board &rarr;
             </Link>
          </div>
        ) : (
          // PROJECT CARDS
          projects.map((project) => (
            <div key={project.id} className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all group flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase mb-2 inline-block ${
                        project.status === 'DRAFT' ? 'bg-slate-800/50 text-slate-300 border-slate-700' :
                        project.status === 'NEGOTIATION' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {project.status}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase">Est. Cost</p>
                      <p className="font-mono font-bold text-indigo-400">{formatCurrency(project.totalRate)}</p>
                   </div>
                </div>

                {/* Members Preview */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                     <Users size={12}/> {project.members.length} Squad Members
                  </p>
                  <div className="flex -space-x-2 overflow-hidden py-1 pl-1">
                     {/* Tampilkan maksimal 5 foto profil */}
                     {project.members.slice(0, 5).map((member) => (
                       <div key={member.id} className="relative w-8 h-8 rounded-full border-2 border-slate-800 bg-indigo-600/80 flex items-center justify-center text-xs text-white font-bold ring-1 ring-indigo-500/30" title={member.hero.name || "Hero"}>
                          {member.hero.name?.charAt(0) || "H"}
                       </div>
                     ))}
                     {/* Indikator sisa member jika lebih dari 5 */}
                     {project.members.length > 5 && (
                       <div className="relative w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold">
                         +{project.members.length - 5}
                       </div>
                     )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20 mt-auto">
                 <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12}/> {new Date(project.createdAt).toLocaleDateString()}
                 </span>
                 
                 {/* UPDATE: BUTTON DIGANTI LINK */}
                 <Link 
                    href={`/lab/project/${project.id}`}
                    className="text-sm font-bold text-indigo-400 hover:text-cyan-400 flex items-center gap-1 hover:gap-2 transition-all"
                 >
                    View Details <ArrowRight size={16}/>
                 </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}