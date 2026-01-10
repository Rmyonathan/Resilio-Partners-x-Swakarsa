import { getJobApplications } from "@/app/lib/actions";
import { Briefcase, Mail, MapPin, CheckCircle, XCircle, Clock, UserCheck, UserX, FileText } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  NEW: { label: "New", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  REVIEWING: { label: "Reviewing", color: "bg-amber-50 text-amber-700 border-amber-200", icon: FileText },
  APPROVED: { label: "Approved", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  ONBOARDING: { label: "Onboarding", color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: UserCheck },
  ACTIVE: { label: "Active", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "bg-red-50 text-red-700 border-red-200", icon: UserX },
};

async function ApplicationsList({ statusFilter }: { statusFilter: string }) {
  const applications = await getJobApplications(statusFilter !== 'ALL' ? statusFilter : undefined);

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 p-8 text-center">
        <Briefcase size={48} className="text-slate-300 mb-4" />
        <p className="text-sm font-medium">No applications found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Job Applied For</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Applied Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app: any) => {
                  const StatusIcon = statusConfig[app.status]?.icon || Clock;
                  const jobTitle = app.jobAppliedFor || 'Arise';
                  return (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">{app.fullName}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <a href={`mailto:${app.email}`} className="flex items-center gap-2 hover:text-indigo-600">
                          <Mail size={14} />
                          {app.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-indigo-500" />
                          <span className="text-sm font-medium text-slate-700">{jobTitle}</span>
                          {app.curatedJob && (
                            <span className="text-xs text-slate-500">({app.curatedJob.companyName})</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{app.phone}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-400" />
                          {app.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(app.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig[app.status]?.color || statusConfig.NEW.color}`}>
                          <StatusIcon size={14} />
                          {statusConfig[app.status]?.label || app.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
      </table>
    </div>
  );
}

export default async function ApplicationsPage({ searchParams }: { searchParams: { status?: string } }) {
  const statusFilter = searchParams.status || 'ALL';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Job Applications</h1>
          <p className="text-slate-600">Manage and review all Arise platform applications.</p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-slate-600">Filter by Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'NEW', 'REVIEWING', 'APPROVED', 'ONBOARDING', 'ACTIVE', 'REJECTED'].map((status) => {
            const StatusIcon = statusConfig[status]?.icon || Briefcase;
            return (
              <Link
                key={status}
                href={`/admin/applications?status=${status}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <StatusIcon size={16} />
                {statusConfig[status]?.label || status}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading applications...</div>}>
          <ApplicationsList statusFilter={statusFilter} />
        </Suspense>
      </div>
    </div>
  );
}

