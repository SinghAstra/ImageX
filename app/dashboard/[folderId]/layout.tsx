import { getCurrentUser } from "@/actions/auth";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { Navbar } from "@/components/dashboard/navbar";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface FolderLayoutProps {
  children: ReactNode;
  params: Promise<{ folderId?: string }>;
}

const FolderLayout = async ({ children, params }: FolderLayoutProps) => {
  const currentUser = await getCurrentUser();
  const { folderId } = await params;

  console.log("folderId is ", folderId);

  if (!currentUser) {
    redirect("/login");
  }

  if (!folderId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 ">
      <Navbar currentUser={currentUser} currentFolderId={folderId} />
      <Breadcrumbs currentFolderId={folderId} />
      {children}
    </div>
  );
};

export default FolderLayout;
