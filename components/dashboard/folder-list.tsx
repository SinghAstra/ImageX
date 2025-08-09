"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderIcon } from "lucide-react";
import Link from "next/link";

interface Folder {
  id: string;
  name: string;
  // Add other folder properties if needed, e.g., createdAt
}

interface FolderListProps {
  folders: Folder[];
  currentPath: string; // The current path to append folder IDs to
}

export function FolderList({ folders, currentPath }: FolderListProps) {
  if (!folders || folders.length === 0) {
    return (
      <p className="text-muted-foreground">
        No folders found in this location.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {folders.map((folder) => (
        <Link key={folder.id} href={`${currentPath}/${folder.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {folder.name}
              </CardTitle>
              <FolderIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Folder</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
