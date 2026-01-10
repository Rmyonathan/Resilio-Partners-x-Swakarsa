import React from "react";
import NavbarWrapper from "../components/agency/NavbarWrapper";

// Layout ini membungkus halaman di dalam folder (agency)
export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="agency-wrapper">
      <NavbarWrapper />
      {children}
    </div>
  );
}