import { auth } from "@/auth";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const session = await auth();
  const isLoggedIn = !!session;
  const userRole = (session?.user as any)?.role;

  return <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />;
}

