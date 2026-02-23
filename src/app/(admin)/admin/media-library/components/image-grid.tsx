"use client";

import { ImageOff } from "lucide-react";

import ImageCard from "./image-card";

import type { MediaResource } from "../types";

type ImageGridProps = {
  resources: MediaResource[];
  onDelete: (publicId: string) => Promise<void>;
};

export default function ImageGrid({ resources, onDelete }: ImageGridProps) {
  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
        <ImageOff className="size-10" />
        <p className="text-sm">No images in this folder</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {resources.map((resource) => (
        <ImageCard
          key={resource.public_id}
          resource={resource}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
