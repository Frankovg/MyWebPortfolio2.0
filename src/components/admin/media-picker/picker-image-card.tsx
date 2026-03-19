"use client";

import { Check } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { ImageCardName } from "./image-card-name";

import type { MediaResource } from "@/app/(admin)/admin/media-library/types/types";

type PickerImageCardProps = {
  resource: MediaResource;
  isSelected: boolean;
  onToggle: (resource: MediaResource) => void;
};

export default function PickerImageCard({
  resource,
  isSelected,
  onToggle,
}: PickerImageCardProps) {
  const displayName = resource.public_id.split("/").pop() || resource.public_id;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onToggle(resource)}
      className={cn(
        "group relative rounded-lg border overflow-hidden bg-background text-left w-full transition-all",
        isSelected ? "ring-2 ring-primary border-primary" : "border-darkPrimary"
      )}
    >
      <div className="relative aspect-square">
        <Image
          src={resource.secure_url}
          alt={displayName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        <div
          className={cn(
            "absolute top-2 right-2 size-5 rounded-full border-2 flex items-center justify-center transition-colors",
            isSelected
              ? "bg-primary border-primary"
              : "bg-black/40 border-white/70"
          )}
          aria-hidden="true"
        >
          {isSelected && <Check className="size-3 text-primary-foreground" />}
        </div>
      </div>

      <ImageCardName name={displayName} format={resource.format} />
    </button>
  );
}
