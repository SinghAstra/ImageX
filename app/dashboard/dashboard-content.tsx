"use client";

import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { FolderList } from "@/components/dashboard/folder-list";
import { Navbar } from "@/components/dashboard/navbar";
import { Folder, User } from "@prisma/client";

export function DashboardContent({
  currentUser,
  folders,
  currentFolderId,
}: {
  currentUser: User;
  folders: Folder[];
  currentFolderId: string | null;
}) {
  return (
    <div className="min-h-screen flex flex-col gap-4 ">
      <Navbar currentUser={currentUser} currentFolderId={currentFolderId} />
      <Breadcrumbs currentFolderId={currentFolderId} />
      <FolderList folders={folders} currentPath="/dashboard" />
    </div>
  );
}
