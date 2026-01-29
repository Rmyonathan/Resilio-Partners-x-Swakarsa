import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

// Skema validasi untuk memastikan input aman sebelum diproses ke DB
const LoginSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // Tambahkan field wixLogin agar bisa digunakan sebagai bypass password dari Wix
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        wixLogin: { label: 'Wix Bypass', type: 'text' },
      },
      async authorize(credentials) {
        // --- LOGIKA BARU UNTUK WIX ---
        if (credentials?.wixLogin === 'true' && credentials?.email) {
          const email = credentials.email as string;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user) return user;
          return null;
        }
        // -----------------------------

        // 1. Validasi format input menggunakan Zod (login biasa dengan email & password)
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // 2. Cari user di database berdasarkan email
          const user = await prisma.user.findUnique({ where: { email } });

          // Jika user tidak ditemukan, return null
          if (!user) return null;

          // 3. Cek kecocokan password dengan yang ada di DB (sudah di-hash)
          if (user.password) {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
              // Jika cocok, kembalikan objek user
              return user;
            }
          }
        }

        console.log('Invalid credentials');
        return null; // Login gagal
      },
    }),
  ],
  // === BAGIAN PENTING: AGAR ID USER TERBAWA SAAT LOGIN ===
  callbacks: {
    // 1. Saat login sukses, simpan ID & Role ke Token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role; // Type assertion for custom role field
      }
      return token;
    },
    // 2. Saat session dibaca di server/client, ambil ID & Role dari Token
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  // === FIX FOR WIX IFRAME: Cookie Configuration ===
  // Di production, kita pakai cookie khusus untuk dukung iframe cross-origin (Wix).
  // Di development (localhost), biarkan konfigurasi default supaya cookie tetap terset di HTTP.
  ...(process.env.NODE_ENV === 'production'
    ? {
        cookies: {
          sessionToken: {
            name: `__Secure-authjs.session-token`, // Must start with __Secure-
            options: {
              httpOnly: true,
              sameSite: 'none', // Essential for iframes
              path: '/',
              secure: true, // Essential for iframes (requires HTTPS)
            },
          },
          callbackUrl: {
            name: `__Secure-authjs.callback-url`,
            options: {
              sameSite: 'none',
              path: '/',
              secure: true,
            },
          },
          csrfToken: {
            name: `__Host-authjs.csrf-token`,
            options: {
              httpOnly: true,
              sameSite: 'none',
              path: '/',
              secure: true,
            },
          },
        },
      }
    : {}),
});
