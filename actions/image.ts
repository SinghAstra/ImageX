"use server";

import { getCurrentUser } from "@/actions/auth";
import { db } from "@/lib/db";
import { put } from "@vercel/blob"; // Import Vercel Blob put function
import { revalidatePath } from "next/cache";

/**
 * Uploads an image file to Vercel Blob storage and records its metadata in the database.
 * @param name The name of the image.
 * @param file The image file to upload.
 * @param folderId The ID of the folder where the image belongs.
 * @returns A success/error message.
 */
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
    // 1. Upload the file to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public", // Make the blob publicly accessible
    });

    // 2. Create the image record in the database
    await db.image.create({
      data: {
        name: name.trim(),
        url: blob.url, // Store the URL returned by Vercel Blob
        folderId: folderId,
        userId: user.id,
      },
    });

    // Revalidate the path to refresh the image list in the current folder
    revalidatePath(`/dashboard/${folderId}`);

    return { success: true, message: "Image uploaded successfully!" };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      message: "Failed to upload image. Please try again.",
    };
  }
}

/**
 * Fetches images within a specific folder for the current user.
 * @param folderId The ID of the folder to fetch images from.
 * @returns An array of image objects, or null if unauthorized/error.
 */
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
        createdAt: "desc", // Order images by creation date
      },
    });
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
}
