import { getContactMessages, updateContactMessageStatus } from "@/app/lib/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Mail, ArrowLeft, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

async function handleStatusUpdate(messageId: string, currentStatus: string) {
  "use server";
  const newStatus = currentStatus === 'UNREAD' ? 'READ' : 'UNREAD';
  await updateContactMessageStatus(messageId, newStatus);
  revalidatePath('/admin/contact');
}

export default async function ContactMessagesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ status?: string }> 
}) {
  const session = await auth();
  const user = session?.user as any;
  
  if (!session || user?.role !== 'ADMIN') {
    redirect('/login');
  }

  const params = await searchParams;
  const statusFilter = params.status || 'ALL';
  
  // Get all messages for stats
  const allMessages = await getContactMessages();
  
  // Get filtered messages for display
  const messages = await getContactMessages(statusFilter !== 'ALL' ? statusFilter : undefined);

  const unreadCount = allMessages.filter((msg: any) => msg.status === 'UNREAD').length;
  const readCount = allMessages.filter((msg: any) => msg.status === 'READ').length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Contact Messages</h1>
            <p className="text-slate-600 mt-1">View and manage contact form submissions</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Total Messages</p>
              <h3 className="text-3xl font-bold text-slate-800">{messages.length}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Mail size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Unread</p>
              <h3 className="text-3xl font-bold text-red-600">{unreadCount}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <Circle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Read</p>
              <h3 className="text-3xl font-bold text-green-600">{readCount}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-slate-600">Filter by Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'UNREAD', 'READ'].map((status) => (
            <Link
              key={status}
              href={`/admin/contact?status=${status}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                statusFilter === status
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {status === 'ALL' && <Mail size={16} />}
              {status === 'UNREAD' && <Circle size={16} />}
              {status === 'READ' && <CheckCircle size={16} />}
              {status}
            </Link>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 p-8 text-center">
            <Mail size={48} className="text-slate-300 mb-4" />
            <p className="text-sm font-medium">No contact messages found.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {messages.map((msg: any) => (
              <div 
                key={msg.id} 
                className={`p-6 hover:bg-slate-50 transition-colors ${
                  msg.status === 'UNREAD' ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-800">{msg.name}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded border ${
                        msg.status === 'UNREAD' 
                          ? 'bg-red-50 text-red-600 border-red-100' 
                          : 'bg-green-50 text-green-600 border-green-100'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <a 
                      href={`mailto:${msg.email}`} 
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center gap-2 mb-3"
                    >
                      <Mail size={14} />
                      {msg.email}
                    </a>
                    <p className="text-xs text-slate-500">{formatDate(msg.createdAt)}</p>
                  </div>
                  <form action={handleStatusUpdate.bind(null, msg.id, msg.status)}>
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        msg.status === 'UNREAD'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {msg.status === 'UNREAD' ? 'Mark as Read' : 'Mark as Unread'}
                    </button>
                  </form>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

