"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageItem } from "@prisma/client";
import { FileIcon } from "lucide-react";
import Image from "next/image";

interface ImageListProps {
  images: ImageItem[];
}

export function ImageList({ images }: ImageListProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-8">
      {images.map((image) => (
        <Card
          key={image.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium truncate">
              {image.name}
            </CardTitle>
            <FileIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-32 bg-muted rounded-md overflow-hidden">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-200 hover:scale-105"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Image</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
