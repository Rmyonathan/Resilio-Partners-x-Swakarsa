import { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginPageClient from "./LoginPageClient";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Platform Login | Resilio Partners",
  description: "Access The Lab or The Guild.",
};

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  if (session?.user) {
    const callbackUrlParam = resolvedSearchParams?.callbackUrl;

    // Jika NextAuth mengirim callbackUrl (misalnya saat user diarahkan dari /lab),
    // gunakan itu sebagai prioritas. Kalau tidak ada, default ke /lab.
    if (typeof callbackUrlParam === "string" && callbackUrlParam.length > 0) {
      return redirect(callbackUrlParam);
    }

    return redirect("/lab");
  }

  return <LoginPageClient />;
}
