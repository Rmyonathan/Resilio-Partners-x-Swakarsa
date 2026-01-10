import { getAllCuratedJobs, toggleCuratedJobActive, deleteCuratedJob } from "@/app/lib/actions";
import { Briefcase, Plus, Edit2, Trash2, ExternalLink, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { JobToggleForm, JobDeleteForm } from "./actions";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
};

export default async function CuratedJobsPage() {
  const jobs = await getAllCuratedJobs();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Curated Jobs Management</h1>
          <p className="text-slate-600">Manage remote job listings displayed on the Jobs page.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/admin/jobs/new"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            Add New Job
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Briefcase size={20} className="text-indigo-600" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Total Jobs</p>
          <h3 className="text-3xl font-bold text-slate-800">{jobs.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Briefcase size={20} className="text-emerald-600" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Active Jobs</p>
          <h3 className="text-3xl font-bold text-emerald-600">{jobs.filter(j => j.isActive).length}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Briefcase size={20} className="text-slate-400" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Inactive Jobs</p>
          <h3 className="text-3xl font-bold text-slate-400">{jobs.filter(j => !j.isActive).length}</h3>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase size={32} className="text-slate-300" />
            </div>
            <p className="text-base font-semibold mb-2 text-slate-600">No curated jobs yet</p>
            <p className="text-sm text-slate-500 mb-6">Start adding remote job listings to display on your Jobs page.</p>
            <Link
              href="/admin/jobs/new"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Add First Job
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 font-semibold border-b-2 border-slate-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Salary</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job: any) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{job.jobTitle}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{job.companyName}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-md">
                      <p className="line-clamp-2 text-sm">{job.description}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {job.salaryRange ? (
                        <span className="font-semibold text-emerald-600">{job.salaryRange}</span>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Not specified</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <JobToggleForm jobId={job.id} isActive={job.isActive} />
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(job.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-200"
                          title="View Apply URL"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <Link
                          href={`/admin/jobs/${job.id}/edit`}
                          className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                          title="Edit Job"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <JobDeleteForm jobId={job.id} jobTitle={job.jobTitle} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

