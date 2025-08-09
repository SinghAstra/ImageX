"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth";

export async function createFolder(name: string, parentId: string | null) {
  const user = await getCurrentUser();

  console.log("user is ", user);

  if (!user) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  if (!name || name.trim() === "") {
    return { success: false, message: "Folder name cannot be empty." };
  }

  try {
    const newFolder = await db.folder.create({
      data: {
        name: name.trim(),
        userId: user.id,
        parentId: parentId,
      },
    });

    console.log("newFolder is ", newFolder);

    revalidatePath(parentId ? `/dashboard/${parentId}` : "/dashboard");

    return { success: true, message: "Folder created successfully!" };
  } catch (error) {
    console.log("Error creating folder.");
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return {
      success: false,
      message: "Failed to create folder. Please try again.",
    };
  }
}

export async function getFolders(parentId: string | null) {
  const user = await getCurrentUser();

  console.log("user is ", user);

  if (!user) {
    return null;
  }

  try {
    const folders = await db.folder.findMany({
      where: {
        userId: user.id,
        parentId: parentId,
      },
      orderBy: {
        name: "asc",
      },
    });

    console.log("folders is ", folders);

    return folders;
  } catch (error) {
    console.log("Error fetching folders.");
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return null;
  }
}

export async function getFolderPath(folderId: string) {
  const user = await getCurrentUser();

  console.log("user is ", user);

  if (!user) {
    return null;
  }

  try {
    let currentFolderId: string = folderId;
    const path: { id: string; name: string }[] = [];

    while (currentFolderId) {
      const folder = await db.folder.findUnique({
        where: { id: currentFolderId!, userId: user.id },
      });

      console.log("folder is ", folder);

      if (!folder) {
        break;
      }

      path.unshift({ id: folder.id, name: folder.name });
      if (folder.parentId === null) {
        return;
      }
      currentFolderId = folder.parentId;
    }

    return path;
  } catch (error) {
    console.log("Error fetching folder path.");

    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return null;
  }
}
