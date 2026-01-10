import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team CVs | Resilio Partners",
  description: "View CVs and qualifications of our team members. All resumes are ATS-compliant and follow US professional standards.",
};

export default function CVsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

