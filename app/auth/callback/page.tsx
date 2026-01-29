'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loginWithWix } from '@/app/lib/auth-actions';

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('Processing Wix authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 1. Ambil data 'user' dari URL
        const userParam = searchParams.get('user');

        if (!userParam) {
          console.error('❌ No user data found in URL');
          setStatus('Error: No user data found.');
          return;
        }

        // 2. Parse data JSON dari Wix
        let wixUserData: any;
        try {
          wixUserData = JSON.parse(decodeURIComponent(userParam));
          console.log('✅ Received Wix User Data:', wixUserData);
        } catch (err) {
          console.error('❌ Failed to parse user data:', err);
          setStatus('Error: Invalid data format.');
          return;
        }

        // 3. Validasi field wajib
        if (!wixUserData.email) {
          console.error('❌ Missing email:', wixUserData);
          setStatus('Error: Email is missing from Wix data.');
          return;
        }

        setStatus('Syncing with database...');

        // 4. Panggil Server Action untuk Login/Register ke Database & NextAuth.
        //    Server action ini akan memanggil signIn() yang melakukan redirect ke /lab.
        //    Jika redirect terjadi, kode setelah baris ini tidak akan dieksekusi.
        const result = await loginWithWix(wixUserData);

        if (result?.success) {
          console.log('✅ Authentication success!');
          setStatus('Login successful! Redirecting...');
        } else {
          throw new Error(result?.message || 'Login failed');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        setStatus(`Authentication Failed: ${error.message}`);
        // Opsional: Redirect ke halaman error setelah beberapa detik
        // setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleAuthCallback();
  }, [searchParams, router]);

  // 5. Tampilan Loading (UI)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {status.includes('Error') || status.includes('Failed') ? (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        )}

        <h2 className="mt-4 text-lg font-medium text-gray-900">{status}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we set up your session.
        </p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading auth...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}


