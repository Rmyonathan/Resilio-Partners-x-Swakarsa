'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. SMART REDIRECT: Cek Role dulu sebelum login
    // Kita intip database sebentar untuk tahu siapa yang mau masuk
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    let destination = '/lab'; // Default landing page (untuk CLIENT)

    if (user) {
      if (user.role === 'ADMIN') {
        destination = '/'; // Redirect Admin to agency homepage (so they can access navbar)
      } else if (user.role === 'CONSULTANT') {
        destination = '/guild'; // Redirect Konsultan
      }
    }

    // 2. Eksekusi Login NextAuth dengan tujuan spesifik
    await signIn('credentials', {
      email,
      password,
      redirectTo: destination, // <-- Ini kuncinya!
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'An error occurred. Please try again.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}

export async function signUp(
  prevState: { success?: boolean; message?: string } | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const adminCode = formData.get('adminCode') as string;

    // Validate admin code (6 digits from env)
    const validAdminCode = process.env.ADMIN_CODE;
    if (!validAdminCode) {
      return {
        success: false,
        message: 'Admin code not configured. Please contact administrator.',
      };
    }

    if (adminCode !== validAdminCode) {
      return { success: false, message: 'Invalid admin code. Please check and try again.' };
    }

    // Validate inputs
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user as ADMIN
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    // Auto sign in after successful signup
    // signIn throws NEXT_REDIRECT error internally (which Next.js handles as redirect)
    // This is expected behavior, not an actual error
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/', // Redirect to agency homepage so admin can access navbar
    });

    // This won't execute if signIn succeeds (it redirects)
    return { success: true, message: 'Account created successfully!' };
  } catch (error: any) {
    // NEXT_REDIRECT is thrown by signIn() - this is expected behavior, not an error
    // Next.js will catch this and perform the redirect
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      // Silently allow redirect - Next.js handles this
      throw error; // Re-throw so Next.js can handle the redirect
    }

    console.error('Signup error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}

// Server Action untuk login / register dari Wix
export async function loginWithWix(wixUser: any) {
  try {
    if (!wixUser?.email) {
      return { success: false, message: 'No email provided' };
    }

    console.log('🔄 Server Action: Processing Wix User', wixUser.email);

    // Password dummy karena user login via Wix (tidak digunakan untuk login biasa)
    const dummyPassword = await bcrypt.hash('wix_placeholder_password', 10);

    // Upsert user berdasarkan email
    const user = await prisma.user.upsert({
      where: { email: wixUser.email },
      update: {
        // Update nama jika berubah di Wix
        name: wixUser.name || (wixUser.email as string).split('@')[0],
      },
      create: {
        email: wixUser.email,
        name: wixUser.name || (wixUser.email as string).split('@')[0],
        role: 'CLIENT', // Default role di schema Anda
        password: dummyPassword,
      },
    });

    console.log('✅ User synced to DB:', user.id);

    // Tentukan tujuan redirect setelah login via Wix.
    // - Di production: ke domain utama https://www.resilio-partners.com/
    // - Di development: gunakan root path '/' (http://localhost:3000/)
    const redirectTarget =
      process.env.NODE_ENV === 'production'
        ? 'https://www.resilio-partners.com/'
        : '/';

    // Eksekusi Login NextAuth
    // Mengirim flag khusus 'wixLogin' agar auth.ts tahu ini login bypass password
    await signIn('credentials', {
      email: wixUser.email,
      wixLogin: 'true',
      redirectTo: redirectTarget,
    });

    // Jika signIn sukses, eksekusi biasanya tidak akan sampai ke sini karena terjadi redirect.
    // Kembalikan nilai fallback untuk berjaga-jaga di lingkungan non-standar.
    return { success: true };
  } catch (error: any) {
    // NEXT_REDIRECT adalah mekanisme normal dari NextAuth/Next.js untuk melakukan redirect.
    // Jangan treat ini sebagai error aplikasi - biarkan Next.js menangani redirect.
    if (error?.digest && typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error('❌ Wix Login Action Error:', error);
    return { success: false, message: 'Internal server error during sync.' };
  }
}
