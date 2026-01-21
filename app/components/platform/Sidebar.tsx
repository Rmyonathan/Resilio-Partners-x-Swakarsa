import Link from "next/link";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Sword,
  ShieldAlert,
  FlaskConical,
  Plus,
  Home
} from "lucide-react";
import { signOut } from "@/auth";

export default function Sidebar({ user }: { user: any }) {
  const role = user?.role || "GUEST";

  // Helper untuk styling link aktif/standar
  const linkClass = "flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-blue-100 hover:text-slate-900 rounded-lg transition-colors group mb-1";
  
  // Helper untuk Badge Role
  const roleColor = 
    role === 'ADMIN' ? 'text-red-400' : 
    role === 'CONSULTANT' ? 'text-emerald-400' : 
    'text-indigo-400';

  return (
    <aside className="w-64 bg-blue-50 border-r border-blue-200 shadow-sm hidden md:flex flex-col h-screen sticky top-0">
      {/* === HEADER: LOGO & IDENTITY === */}
      <div className="p-6 border-b border-blue-200">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm">
            <img 
              src="/images/resilio-logo.png" 
              alt="Resilio Partners Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          Resilio Partners
        </Link>
        <div className="mt-4 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs text-slate-600 font-mono flex justify-between items-center">
           <span>Role:</span>
           <span className={`font-bold ${roleColor}`}>
             {role}
           </span>
        </div>
      </div>

      {/* === BODY: DYNAMIC MENU === */}
      <nav className="flex-1 p-4 overflow-y-auto">
        
        {/* 1. MENU KHUSUS ADMIN */}
        {role === 'ADMIN' && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-red-500/80 uppercase tracking-wider mb-2">
              Command Center
            </div>
            <Link href="/admin" className={`${linkClass} hover:bg-red-500/10 hover:text-red-400`}>
              <ShieldAlert size={18} className="text-red-500" />
              Admin Panel
            </Link>
            <Link href="/" className={linkClass}>
              <Home size={18} className="text-slate-600" />
              Main Page
            </Link>
          </>
        )}

        {/* 2. MENU KHUSUS KONSULTAN (HERO) */}
        {role === 'CONSULTANT' && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-emerald-500/80 uppercase tracking-wider mb-2">
              Workstation
            </div>
            <Link href="/guild" className={`${linkClass} hover:bg-emerald-500/10 hover:text-emerald-400`}>
              <Sword size={18} className="text-emerald-500" />
              The Guild Hall
            </Link>
            {/* Konsultan tidak butuh akses ke Lab/Drafting */}
          </>
        )}

        {/* 3. MENU KHUSUS CLIENT */}
        {role === 'CLIENT' && (
          <>
             <div className="px-3 py-2 text-xs font-semibold text-indigo-500/80 uppercase tracking-wider mb-2">
              Project Workspace
            </div>
            <Link href="/lab" className={linkClass}>
              <FlaskConical size={18} className="text-indigo-400" />
              Dashboard
            </Link>
            <Link href="/lab/draft" className={linkClass}>
              <Plus size={18} className="text-indigo-400" />
              New Project
            </Link>
          </>
        )}

        {/* 4. COMMON SETTINGS (Semua Role Punya) */}
        <div className="px-3 py-2 mt-6 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Account
        </div>
        <Link href="/settings" className={linkClass}>
          <Settings size={18} className="text-slate-600" />
          Settings
        </Link>
      </nav>

      {/* === FOOTER: LOGOUT === */}
      <div className="p-4 border-t border-blue-200">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="flex w-full items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium">
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}