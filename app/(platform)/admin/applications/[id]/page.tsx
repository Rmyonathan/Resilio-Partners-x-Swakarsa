import { getJobApplicationById, updateApplicationStatus, updateApplicationNotes } from "@/app/lib/actions";
import { 
  ArrowLeft, Mail, Phone, MapPin, CheckCircle, XCircle, Clock, UserCheck, 
  UserX, FileText, Briefcase
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UpdateStatusForm, UpdateNotesForm } from "./forms";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
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

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getJobApplicationById(id);

  if (!application) {
    notFound();
  }

  const StatusIcon = statusConfig[application.status]?.icon || Clock;
  const statusLabel = statusConfig[application.status]?.label || application.status;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 min-h-screen bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Back to Applications
        </Link>
        <div className="flex gap-3">
          <Link
            href="/admin/applications"
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors text-sm"
          >
            All Applications
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8 md:p-10 space-y-6">
        {/* Applicant Header */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{application.fullName}</h1>
              <p className="text-sm text-slate-500 font-mono mb-2">ID: {application.id.slice(0, 8)}...</p>
              {application.jobAppliedFor && (
                <div className="flex items-center gap-2 mt-3">
                  <Briefcase className="text-indigo-500" size={16} />
                  <span className="text-sm font-semibold text-indigo-600">
                    Applied for: {application.jobAppliedFor}
                  </span>
                  {application.curatedJob && (
                    <span className="text-xs text-slate-500">at {application.curatedJob.companyName}</span>
                  )}
                </div>
              )}
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border shadow-sm ${statusConfig[application.status]?.color || statusConfig.NEW.color}`}>
              <StatusIcon size={18} />
              {statusLabel}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Mail className="text-indigo-500" size={20} />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <a href={`mailto:${application.email}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600">
                  {application.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Phone className="text-green-500" size={20} />
              <div>
                <p className="text-xs text-slate-500">Phone</p>
                <a href={`tel:${application.phone}`} className="text-sm font-semibold text-slate-800 hover:text-green-600">
                  {application.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <MapPin className="text-purple-500" size={20} />
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm font-semibold text-slate-800">{application.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-indigo-500" />
                Application Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Has Workspace & Internet</label>
                  <div className="mt-2">
                    {application.hasWorkspace ? (
                      <span className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
                        <CheckCircle size={16} />
                        Yes - Ready for remote work
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 font-medium">
                        <XCircle size={16} />
                        No - Workspace needed
                      </span>
                    )}
                  </div>
                </div>

                {application.experience && (
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Previous Experience</label>
                    <p className="mt-2 text-slate-700 bg-white p-4 rounded-lg border border-slate-200 whitespace-pre-wrap">
                      {application.experience}
                    </p>
                  </div>
                )}

                {application.referralSource && (
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Referral Source</label>
                    <p className="mt-2 text-slate-700 bg-white p-4 rounded-lg border border-slate-200">
                      {application.referralSource}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied Date</label>
                  <p className="mt-2 text-slate-700">{formatDate(application.createdAt)}</p>
                </div>

                {application.updatedAt && application.updatedAt.getTime() !== application.createdAt.getTime() && (
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</label>
                    <p className="mt-2 text-slate-700">{formatDate(application.updatedAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Update Status */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="text-indigo-600" size={20} />
                Update Status
              </h3>
              <UpdateStatusForm applicationId={application.id} currentStatus={application.status} />
            </div>

            {/* Internal Notes */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="text-amber-600" size={20} />
                Internal Notes
              </h3>
              <UpdateNotesForm applicationId={application.id} currentNotes={application.notes || ''} />
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${application.email}?subject=Application Update - ${application.fullName}`}
                  className="block w-full text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm shadow-sm hover:shadow-md"
                >
                  <Mail className="inline-block mr-2" size={16} />
                  Email Applicant
                </a>
                <Link
                  href={`/admin/applications?status=${application.status}`}
                  className="block w-full text-center px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors text-sm"
                >
                  View Similar Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

