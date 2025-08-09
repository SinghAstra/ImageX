"use client";

import { FolderList } from "@/components/dashboard/folder-list";
import { NewFolderModal } from "@/components/dashboard/new-folder-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Folder {
  id: string;
  name: string;
  // Add other folder properties if needed, e.g., createdAt
}

interface DashboardContentProps {
  folders: Folder[];
  currentFolderId: string | null;
}

export function FolderContent({
  folders,
  currentFolderId,
}: DashboardContentProps) {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  const handleNewFolderClick = () => {
    setIsNewFolderModalOpen(true);
  };

  const hasContent = folders.length > 0; // Add images.length > 0 later

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {hasContent ? (
        <FolderList folders={folders} />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-muted-foreground mb-4">
            No folders or images found in this location.
          </p>
          <Button onClick={handleNewFolderClick}>
            <Plus className="mr-2 h-4 w-4" /> Create First Folder
          </Button>
        </div>
      )}

      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        parentId={currentFolderId}
      />
    </div>
  );
}
