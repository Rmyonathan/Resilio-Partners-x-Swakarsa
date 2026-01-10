import { createCuratedJob } from "@/app/lib/actions";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { JobForm } from "../form";

export default function NewJobPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const result = await createCuratedJob(formData);
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
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Plus size={28} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Add New Curated Job</h1>
              <p className="text-slate-600 mt-1">Add a new remote job listing to display on the Jobs page.</p>
            </div>
          </div>
        </div>

        <JobForm action={handleSubmit} />
      </div>
    </div>
  );
}

