import Navbar from "@/components/shared/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { session } = await auth();
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
