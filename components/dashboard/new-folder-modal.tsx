"use client";

import { createFolder } from "@/actions/folder"; // Import the server action
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NewFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentId?: string | null;
}

export function NewFolderModal({
  isOpen,
  onClose,
  parentId,
}: NewFolderModalProps) {
  const [folderName, setFolderName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (response?.success) {
      toast.success(response.message);
      setFolderName(""); // Clear input on success
      setResponse(null); // Reset response state
      onClose(); // Close modal
    } else if (response?.success === false) {
      toast.error(response.message);
    }
  }, [response, onClose]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setResponse(null); // Clear previous response

    const result = await createFolder(folderName, parentId || null);
    setResponse(result);
    setIsPending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3"
                required
                disabled={isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
