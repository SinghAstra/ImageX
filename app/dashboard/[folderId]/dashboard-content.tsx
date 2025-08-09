"use client";

import { getFolders } from "@/actions/folder";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { FolderList } from "@/components/dashboard/folder-list";
import { NewFolderModal } from "@/components/dashboard/new-folder-modal";
import { Button } from "@/components/ui/button";
import { Folder } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";

export function DashboardContent({
  folders,
  currentFolderId,
}: {
  folders: Folder[];
  currentFolderId: string | null;
}) {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">My Files</h1>
        <Button onClick={() => setIsNewFolderModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Folder
        </Button>
      </div>
      <Breadcrumbs currentFolderId={currentFolderId} />
      <FolderList
        folders={folders}
        currentPath={`/dashboard/${currentFolderId}`}
      />

      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        parentId={currentFolderId}
      />
    </>
  );
}
