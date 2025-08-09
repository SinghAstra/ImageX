"use server";

import { getCurrentUser } from "@/actions/auth";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploadImage(name: string, file: File, folderId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  if (!name || name.trim() === "") {
    return { success: false, message: "Image name cannot be empty." };
  }

  if (!file) {
    return { success: false, message: "No image file provided." };
  }

  try {
    const blob = await put(file.name, file, {
      access: "public",
    });

    await db.image.create({
      data: {
        name: name.trim(),
        url: blob.url,
        folderId: folderId,
        userId: user.id,
      },
    });

    revalidatePath(`/dashboard/${folderId}`);

    return { success: true, message: "Image uploaded successfully!" };
  } catch (error) {
    console.log("Error uploading image.");
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return {
      success: false,
      message: "Failed to upload image. Please try again.",
    };
  }
}

export async function getImagesInFolder(folderId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  try {
    const images = await db.image.findMany({
      where: {
        userId: user.id,
        folderId: folderId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
}
