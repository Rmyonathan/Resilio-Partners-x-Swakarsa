'use client';

import { authenticate } from '../../lib/auth-actions';
import { useActionState } from 'react'; // Ganti useFormState dengan useActionState
import { useFormStatus } from 'react-dom';
import { Lock, Loader2, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm({ redirectUrl }: { redirectUrl?: string }) {
  const searchParams = useSearchParams();
  // Get redirect URL from props, search params, or callbackUrl
  const finalRedirectUrl = redirectUrl || searchParams.get('redirect') || searchParams.get('callbackUrl') || undefined;
  
  // Create a wrapper function that adds redirect URL to form data
  const authenticateWithRedirect = async (formData: FormData) => {
    if (finalRedirectUrl) {
      formData.append('redirectUrl', finalRedirectUrl);
    }
    return authenticate(undefined, formData);
  };

  // PERUBAHAN DI SINI:
  // React 19 mengubah useFormState menjadi useActionState
  // Return value-nya juga sedikit berbeda (ada isPending di index ke-2), tapi logic utamanya sama.
  const [errorMessage, dispatch, isPending] = useActionState(authenticateWithRedirect, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="admin@swakarsa.id"
          required
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Lock size={16} className="absolute right-4 top-3.5 text-slate-400" />
        </div>
      </div>

      {/* Menampilkan Error jika login gagal */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          <AlertCircle size={16} />
          <p>{errorMessage}</p>
        </div>
      )}

      <LoginButton />
    </form>
  );
}

// Tombol terpisah agar bisa menggunakan hook useFormStatus
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
}