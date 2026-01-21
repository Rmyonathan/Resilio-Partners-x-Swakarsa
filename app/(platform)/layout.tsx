import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../components/platform/Sidebar";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cek sesi login di level layout
  const session = await auth();

  // Jika tidak login, tendang ke halaman login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar Kiri */}
      <Sidebar user={session.user} />

      {/* Konten Utama Kanan */}
      <main className="flex-1 overflow-y-auto relative bg-white">
        <div className="p-4 md:p-8 pb-20 max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}