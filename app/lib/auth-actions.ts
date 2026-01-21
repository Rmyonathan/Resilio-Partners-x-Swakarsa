'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

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
      select: { role: true }
    });

    let destination = '/lab'; // Default landing page (untuk CLIENT)

    if (user) {
      if (user.role === 'ADMIN') {
        destination = '/';      // Redirect Admin to agency homepage (so they can access navbar)
      } else if (user.role === 'CONSULTANT') {
        destination = '/guild';      // Redirect Konsultan
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
      return { success: false, message: 'Admin code not configured. Please contact administrator.' };
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
      where: { email }
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
        role: 'ADMIN'
      }
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