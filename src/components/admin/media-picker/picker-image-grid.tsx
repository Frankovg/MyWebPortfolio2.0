"use client";

import { NoImages } from "./no-images";
import PickerImageCard from "./picker-image-card";

import type { MediaResource } from "@/lib/types";


type PickerImageGridProps = {
  resources: MediaResource[];
  selectedUrls: Set<string>;
  onToggle: (resource: MediaResource) => void;
};

export default function PickerImageGrid({
  resources,
  selectedUrls,
  onToggle,
}: PickerImageGridProps) {
  if (resources.length === 0) {
    return (
      <NoImages />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {resources.map((resource) => (
        <PickerImageCard
          key={resource.public_id}
          resource={resource}
          isSelected={selectedUrls.has(resource.secure_url)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
