"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import SignUpForm from "@/app/components/platform/SignUpForm";

export default function SignUpPageClient() {
  const [emailAnimation, setEmailAnimation] = useState<any>(null);

  useEffect(() => {
    // Load Email animation
    fetch('/animations/Email.json')
      .then(res => res.json())
      .then(data => setEmailAnimation(data))
      .catch(err => console.error('Failed to load email animation:', err));
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

          {/* Email Animation */}
          {emailAnimation && (
            <div className="mb-6 w-full flex justify-center">
              <div className="w-80 h-80">
                <Lottie 
                  animationData={emailAnimation} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          )}

          <h2 className="text-4xl font-extrabold mb-4">Create Your Account</h2>
          <p className="text-blue-100 text-lg">
               Join us in building something extraordinary...    
          </p>
        </div>
      </div>

      {/* Kanan: Form Sign Up */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative bg-blue-50">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Agency
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">Sign Up</h1>
            <p className="text-slate-600 mt-2">Create your account to get started.</p>
          </div>

          {/* Sign Up Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-md">
            <SignUpForm />
          </div>

          <div className="pt-6 text-center border-t border-slate-300">
            <p className="text-slate-600 text-sm">
              Already have an account? <br />
              <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-semibold">Sign In</Link> or <Link href="/jobs" className="text-blue-600 hover:text-blue-700 hover:underline">Apply as Partner</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

