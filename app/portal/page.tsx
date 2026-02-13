import { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginPageClient from "../login/LoginPageClient";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Portal Login | Resilio Partners",
  description: "Access your Resilio Partners dashboard.",
};

type PortalPageProps = {
  searchParams?: Promise<{
    redirect?: string;
    callbackUrl?: string;
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const session = await auth();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  if (session?.user) {
    // If user is logged in, redirect to the specified redirect URL or default
    const redirectUrl = resolvedSearchParams?.redirect || resolvedSearchParams?.callbackUrl;
    
    if (typeof redirectUrl === "string" && redirectUrl.length > 0) {
      return redirect(redirectUrl);
    }

    // Default redirect based on role
    const role = (session.user as any).role;
    if (role === 'CLIENT') return redirect('/lab');
    if (role === 'CONSULTANT') return redirect('/guild');
    if (role === 'ADMIN') return redirect('/admin');
    
    return redirect('/');
  }

  // Pass redirect parameter to login page
  return <LoginPageClient redirectUrl={resolvedSearchParams?.redirect as string | undefined} />;
}

