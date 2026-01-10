import { 
  getContactMessages, 
  getJobApplications, 
  getAllProjects, 
  approveProject 
} from "@/app/lib/actions";
import { 
  Mail, 
  Briefcase, 
  FlaskConical, 
  Play, 
  Calendar, 
  CheckCircle, 
  XCircle,
  MapPin,
  User 
} from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

// Format Tanggal Helper
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

// Helper format uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Server Action Wrapper untuk Button Activate
async function handleApprove(formData: FormData) {
  "use server";
  const projectId = formData.get("projectId") as string;
  await approveProject(projectId);
  // Revalidate dilakukan di dalam fungsi approveProject, tapi tidak ada salahnya memastikan
  revalidatePath('/admin');
}

export default async function AdminDashboard() {
  // Ambil semua data secara paralel untuk performa
  const [messages, applicants, projects] = await Promise.all([
    getContactMessages(),
    getJobApplications(),
    getAllProjects()
  ]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Admin Command Center</h1>
          <p className="text-slate-600">Manage applications, jobs, projects, and contact messages.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/admin/applications"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <Briefcase size={16} />
            View All Applications
          </Link>
          <Link
            href="/admin/jobs"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <Briefcase size={16} />
            Manage Jobs
          </Link>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Messages */}
          <Link
            href="/admin"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-indigo-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <Mail size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                messages.length > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {messages.length}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Contact Messages</p>
            <h3 className="text-2xl font-bold text-slate-800">{messages.length}</h3>
            <p className="text-xs text-slate-400 mt-2">View inbox</p>
          </Link>
          
          {/* Card 2: Job Applications */}
          <Link
            href="/admin/applications"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-emerald-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Briefcase size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                applicants.filter((a: any) => a.status === 'NEW').length > 0 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {applicants.filter((a: any) => a.status === 'NEW').length} New
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Job Applications</p>
            <h3 className="text-2xl font-bold text-slate-800">{applicants.length}</h3>
            <p className="text-xs text-slate-400 mt-2">Manage all →</p>
          </Link>

          {/* Card 3: Projects */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <FlaskConical size={24} />
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                {projects.filter((p: any) => p.status === 'NEGOTIATION' || p.status === 'DRAFT').length} Pending
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Projects</p>
            <h3 className="text-2xl font-bold text-slate-800">{projects.length}</h3>
            <p className="text-xs text-slate-400 mt-2">Project requests</p>
          </div>
          
          {/* Card 4: Curated Jobs */}
          <Link
            href="/admin/jobs"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-cyan-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-cyan-100 text-cyan-600 rounded-lg group-hover:bg-cyan-200 transition-colors">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-cyan-100 text-cyan-700">
                Manage
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Curated Jobs</p>
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
              Manage →
            </h3>
            <p className="text-xs text-slate-400 mt-2">Add/edit job listings</p>
          </Link>
        </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* --- SECTION 1: PROJECT REQUESTS (THE LAB) --- */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[450px] xl:col-span-2">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50">
            <h2 className="font-bold text-xl text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FlaskConical size={20} className="text-purple-600"/>
              </div>
              Project Requests
            </h2>
            <span className="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">
              {projects.length} Total
            </span>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
             {projects.length === 0 ? <EmptyState text="Belum ada project dari Client." /> : (
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100 sticky top-0">
                   <tr>
                     <th className="px-6 py-3">Project Name</th>
                     <th className="px-6 py-3">Client</th>
                     <th className="px-6 py-3">Squad</th>
                     <th className="px-6 py-3">Value</th>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {projects.map((p) => (
                     <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                       <td className="px-6 py-4 text-slate-600">
                         <div className="flex items-center gap-2">
                           <User size={14} className="text-slate-400"/>
                           {p.client.email}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-slate-600">{p.members.length} Heroes</td>
                       <td className="px-6 py-4 font-mono text-emerald-600 font-bold">{formatCurrency(p.totalRate)}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                           p.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                           p.status === 'DRAFT' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                           'bg-amber-50 text-amber-600 border-amber-200'
                         }`}>
                           {p.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         {p.status === 'NEGOTIATION' || p.status === 'DRAFT' ? (
                           <form action={handleApprove}>
                             <input type="hidden" name="projectId" value={p.id} />
                             <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 ml-auto transition-all active:scale-95 shadow-sm">
                               <Play size={12} /> Activate
                             </button>
                           </form>
                         ) : (
                           <span className="text-xs text-slate-400 font-medium italic">No action</span>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
        </section>

        {/* --- SECTION 2: INBOX PESAN --- */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-blue-50">
            <h2 className="font-bold text-xl text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Mail size={20} className="text-indigo-600"/>
              </div>
              Contact Messages
            </h2>
            <span className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-sm ${
              messages.length > 0 
                ? 'bg-red-600 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {messages.length}
            </span>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
            {messages.length === 0 ? <EmptyState text="Belum ada pesan masuk." /> : (
              <div className="divide-y divide-slate-100">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-800">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{formatDate(msg.createdAt)}</span>
                    </div>
                    <a href={`mailto:${msg.email}`} className="text-xs text-indigo-600 hover:underline block mb-3 font-medium">
                      {msg.email}
                    </a>
                    <div className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700 italic">
                      "{msg.message}"
                    </div>
                    <div className="mt-3 flex gap-2">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        msg.status === 'UNREAD' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
                       }`}>
                         {msg.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- SECTION 3: JOB APPLICATIONS --- */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-green-50">
            <h2 className="font-bold text-xl text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Briefcase size={20} className="text-emerald-600"/>
              </div>
              Job Applications
            </h2>
            <Link 
              href="/admin/applications"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-full font-bold transition-colors shadow-sm flex items-center gap-1"
            >
              Manage All
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full">{applicants.length}</span>
            </Link>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
             {applicants.length === 0 ? <EmptyState text="No applications yet." /> : (
              <div className="divide-y divide-slate-100">
                {applicants.slice(0, 5).map((app: any) => (
                  <Link 
                    key={app.id} 
                    href={`/admin/applications/${app.id}`}
                    className="block p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-800">{app.fullName}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{formatDate(app.createdAt)}</span>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-xs text-slate-500 mb-3">
                       <div className="flex items-center gap-2">
                         <Mail size={12}/> {app.email}
                       </div>
                       <div className="flex items-center gap-2">
                         <MapPin size={12}/> {app.location}
                       </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                       {app.hasWorkspace ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200 font-medium">
                            <CheckCircle size={10} /> Workspace Ready
                          </span>
                       ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200 font-medium">
                            <XCircle size={10} /> No Workspace
                          </span>
                       )}
                       <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                         app.status === 'NEW' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                         app.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                         app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                         'bg-slate-50 text-slate-700 border-slate-200'
                       }`}>
                         {app.status}
                       </span>
                    </div>
                  </Link>
                ))}
                {applicants.length > 5 && (
                  <div className="p-6 text-center">
                    <Link 
                      href="/admin/applications"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                    >
                      View all {applicants.length} applications →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center opacity-60">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
        <Calendar size={20} className="text-slate-300"/>
      </div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}