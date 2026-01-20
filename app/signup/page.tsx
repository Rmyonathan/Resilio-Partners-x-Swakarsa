import { Metadata } from "next";
import SignUpPageClient from "./SignUpPageClient";

export const metadata: Metadata = {
  title: "Sign Up | Resilio Partners",
  description: "Create your account to get started.",
};

export default function SignUpPage() {
  return <SignUpPageClient />;
}

