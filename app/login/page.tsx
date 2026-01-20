import { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Platform Login | Resilio Partners",
  description: "Access The Lab or The Guild.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
