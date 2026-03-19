"use client";

import { useEffect, useState } from "react";

import { NoImages } from "@/components/admin/media-picker/no-images";
import { Switch } from "@/components/ui/switch";

import ImageCard from "./image-card";

import type { MediaResource } from "../types/types";

type ImageGridProps = {
  resources: MediaResource[];
  onDelete: (publicId: string) => Promise<void>;
};

export default function ImageGrid({ resources, onDelete }: ImageGridProps) {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setShowButtons(!e.matches);
    };
    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  if (resources.length === 0) {
    return (
      <NoImages />
    );
  }

  return (
    <div className="max-lg:space-y-4">
      <div className="lg:hidden w-full h-auto flex justify-end items-center space-x-2">
        <Switch
          checked={showButtons}
          className="enabled:bg-whiteText "
          onCheckedChange={(checked) => setShowButtons(checked)}
        />
        <button
          type="button"
          onClick={() => setShowButtons(!showButtons)}
          className="text-base hover:cursor-pointer"
        >
          Show buttons
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {resources.map((resource) => (
          <ImageCard
            key={resource.public_id}
            resource={resource}
            onDelete={onDelete}
            showButtons={showButtons}
          />
        ))}
      </div>
    </div>
  );
}
