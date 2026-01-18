import { getAssignedProjects } from "@/app/lib/actions";
import { Sword, Scroll, Users, Calendar, Shield, MapPin, User } from "lucide-react";
import Link from "next/link"; // Import Link wajib ada

export default async function GuildDashboard() {
  const projects = await getAssignedProjects();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-indigo-500/30 pb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl text-white shadow-lg shadow-indigo-500/30">
          <Sword size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">The Guild Hall</h1>
          <p className="text-slate-300">Active Quests & Assignments.</p>
        </div>
      </div>

      {/* Quest Board (Project List) */}
      <div className="grid grid-cols-1 gap-6">
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-indigo-500/30">
             <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
               <Shield size={32} className="text-indigo-400" />
             </div>
             <h3 className="text-lg font-bold text-white">No Active Quests</h3>
             <p className="text-slate-300">You haven't been assigned to any party yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-indigo-500/20 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all group">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900/80 p-6 flex justify-between items-start text-white border-b border-indigo-500/20">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        project.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 
                        'bg-amber-500/20 text-amber-400 border-amber-500/50'
                     }`}>
                       {project.status}
                     </span>
                     <span className="text-xs text-slate-400 flex items-center gap-1">
                       <Calendar size={12}/> {new Date(project.createdAt).toLocaleDateString()}
                     </span>
                   </div>
                   <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                     {project.name}
                   </h3>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-1 justify-end">
                    <User size={14} /> Client
                  </div>
                  <p className="font-bold text-indigo-300">{project.client.name || project.client.email}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 bg-slate-900/30">
                 {/* Layout responsif: Flex Column di HP, Row di Desktop */}
                 <div className="flex items-start gap-6 flex-col sm:flex-row">
                    
                    {/* Party Members */}
                    <div className="flex-1 w-full">
                       <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                         <Users size={14}/> Party Members
                       </h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {project.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-indigo-500/30">
                                 {member.hero.name?.charAt(0)}
                               </div>
                               <div>
                                 <p className="text-sm font-bold text-white leading-tight">{member.hero.name}</p>
                                 <p className="text-[10px] text-slate-400 uppercase">Specialist</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Action Button (Link to Detail) */}
                    <div className="w-full sm:w-auto flex flex-col items-end justify-center min-w-[150px] mt-4 sm:mt-0">
                       <Link 
                         href={`/guild/project/${project.id}`}
                         className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                       >
                         <Scroll size={18} />
                         View Quest
                       </Link>
                    </div>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}