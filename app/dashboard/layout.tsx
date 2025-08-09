import { getCurrentUser } from "@/actions/auth";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { Navbar } from "@/components/dashboard/navbar";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  params: { folderId?: string };
}

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const currentUser = await getCurrentUser();
  const folderId = params.folderId || null;

  console.log("folderId is ", folderId);

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 ">
      <Navbar currentUser={currentUser} currentFolderId={folderId} />
      <Breadcrumbs currentFolderId={folderId} />
      {children}
    </div>
  );
};

export default DashboardLayout;
