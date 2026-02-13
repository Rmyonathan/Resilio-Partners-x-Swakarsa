"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../components/platform/LoginForm";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function LoginPageClient({ redirectUrl }: { redirectUrl?: string }) {
  const [atomicMotionAnimation, setAtomicMotionAnimation] = useState<any>(null);
  const [createAccountAnimation, setCreateAccountAnimation] = useState<any>(null);
  const wixLoginUrl = process.env.NEXT_PUBLIC_WIX_LOGIN_URL ?? "";

  useEffect(() => {
    // Load Atomic Motion animation
    fetch('/animations/Atomic Motion.json')
      .then(res => res.json())
      .then(data => setAtomicMotionAnimation(data))
      .catch(err => console.error('Failed to load atomic motion animation:', err));

    // Load Create Account animation
    fetch('/animations/create account.json')
      .then(res => res.json())
      .then(data => setCreateAccountAnimation(data))
      .catch(err => console.error('Failed to load create account animation:', err));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white flex flex-col md:flex-row">
      {/* Kiri: Visual / Branding */}
      <div className="hidden md:flex w-1/2 bg-blue-900/50 relative items-center justify-center overflow-hidden border-r border-blue-400/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-blue-800/20 to-blue-900/40 opacity-50" />
        <div className="relative z-10 text-center px-12 w-full">
          {/* Resilio Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
                <img 
                  src="/images/resilio-logo.png" 
                  alt="Resilio Partners Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Resilio Partners
              </span>
            </div>
          </div>

          {/* Create Account Animation */}
          {createAccountAnimation && (
            <div className="mb-6 w-full flex justify-center">
              <div className="w-72 h-80">
                <Lottie 
                  animationData={createAccountAnimation} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          )}

          <h2 className="text-4xl font-extrabold mb-4">Welcome to Resilio Partners</h2>
          <p className="text-blue-100 text-lg">
            Empowering careers and businesses through innovative solutions. Join us in building something extraordinary.
          </p>
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative bg-gradient-to-br from-blue-50 to-blue-100/50">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Agency
        </Link>

        <div className="w-full max-w-md space-y-8">
          {/* Atomic Motion Animation */}
          {atomicMotionAnimation && (
            <div className="flex justify-center -mb-4">
              <div className="w-64 h-64 relative overflow-hidden" style={{ clipPath: 'circle(50%)' }}>
                <Lottie 
                  animationData={atomicMotionAnimation} 
                  loop={true}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: 'transparent'
                  }}
                />
                <div 
                  className="absolute inset-0 bg-blue-500/30 pointer-events-none" 
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </div>
          )}

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-600 mt-2">Sign in to your dashboard.</p>
          </div>

          {/* Email / Password Login */}
          <LoginForm redirectUrl={redirectUrl} />

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-slate-300" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              or
            </span>
            <div className="h-px flex-1 bg-slate-300" />
          </div>

          {/* Login via Wix */}
          <button
            type="button"
            onClick={() => {
              if (!wixLoginUrl) {
                console.error("Wix login URL is not configured (NEXT_PUBLIC_WIX_LOGIN_URL).");
                return;
              }
              window.location.href = wixLoginUrl;
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-blue-700 border border-blue-200 py-3 px-4 text-sm font-semibold shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <span className="inline-block h-5 w-5 rounded-sm bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
              W
            </span>
            <span>Continue with Wix</span>
          </button>

          <p className="text-[11px] text-slate-500 text-center mt-2">
            You&apos;ll be redirected to our Wix member portal and then back to your dashboard.
          </p>

          <div className="pt-6 text-center border-t border-slate-300">
            <p className="text-slate-600 text-sm">
              Don't have an account? <br />
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 hover:underline font-semibold">Sign Up</Link> or <Link href="/jobs" className="text-blue-600 hover:text-blue-700 hover:underline">Apply as Partner</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

