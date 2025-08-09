"use client";

import { getFolderPath } from "@/actions/folder";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BreadcrumbItem {
  id: string;
  name: string;
}

interface BreadcrumbsProps {
  currentFolderId: string | null;
}

export function Breadcrumbs({ currentFolderId }: BreadcrumbsProps) {
  const [path, setPath] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    async function fetchPath() {
      if (currentFolderId) {
        const folderPath = await getFolderPath(currentFolderId);
        if (folderPath) {
          setPath(folderPath);
        }
      } else {
        setPath([]);
      }
    }
    fetchPath();
  }, [currentFolderId]);

  if (path.length === 0) {
    return;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground px-4 sm:px-8 py-2">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground"
      >
        Home
      </Link>
      {path.map((item) => (
        <span key={item.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={`/dashboard/${item.id}`}
            className="hover:text-foreground"
          >
            {item.name}
          </Link>
        </span>
      ))}
    </nav>
  );
}
