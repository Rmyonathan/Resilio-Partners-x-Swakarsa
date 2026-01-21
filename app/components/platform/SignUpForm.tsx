'use client';

import { signUp } from '../../lib/auth-actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Lock, Loader2, AlertCircle, User, Mail, Key } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Creating Account...</span>
        </>
      ) : (
        <span>Create Account</span>
      )}
    </button>
  );
}

export default function SignUpForm() {
  const [state, dispatch, isPending] = useActionState(signUp, undefined);

  return (
    <form action={dispatch} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Full Name</label>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            required
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 pl-11 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <User size={18} className="absolute left-4 top-3.5 text-slate-400" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email Address</label>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            required
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 pl-11 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 pl-11 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Lock size={18} className="absolute left-4 top-3.5 text-slate-400" />
        </div>
        <p className="text-xs text-slate-500">Password must be at least 6 characters</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Admin Code</label>
        <div className="relative">
          <input
            type="text"
            name="adminCode"
            placeholder="123456"
            required
            maxLength={6}
            pattern="[0-9]{6}"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 pl-11 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Key size={18} className="absolute left-4 top-3.5 text-slate-400" />
        </div>
        <p className="text-xs text-slate-500">Enter the 6-digit admin code</p>
      </div>

      {/* Error Message */}
      {state && !state.success && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-sm font-medium text-red-600">{state.message}</p>
        </div>
      )}

      {/* Success Message */}
      {state && state.success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <AlertCircle size={20} className="text-green-600 flex-shrink-0" />
          <p className="text-sm font-medium text-green-600">{state.message}</p>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

