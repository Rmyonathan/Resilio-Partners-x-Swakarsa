import { getAllCuratedJobs, updateCuratedJob } from "@/app/lib/actions";
import { ArrowLeft, Edit2 } from "lucide-react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { JobForm } from "../../form";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobs = await getAllCuratedJobs();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    notFound();
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    formData.append('id', id);
    const result = await updateCuratedJob(formData);
    if (result.success) {
      redirect("/admin/jobs");
    }
    return result;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8 md:p-10">
        <div className="mb-8 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Edit2 size={28} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Edit Curated Job</h1>
              <p className="text-slate-600 mt-1">Update job listing information.</p>
            </div>
          </div>
        </div>

        <JobForm action={handleSubmit} job={job} />
      </div>
    </div>
  );
}

