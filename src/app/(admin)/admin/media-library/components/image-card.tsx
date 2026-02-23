"use client";

import { Copy, ExternalLink, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import DeleteModal from "@/components/admin/delete-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { MediaResource } from "../types";

type ImageCardProps = {
  resource: MediaResource;
  onDelete: (publicId: string) => Promise<void>;
};

export default function ImageCard({ resource, onDelete }: ImageCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const displayName = resource.public_id.split("/").pop() || resource.public_id;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(resource.secure_url);
    toast.success("URL copied to clipboard");
  };

  return (
    <>
      <div className="group relative rounded-lg border border-darkPrimary overflow-hidden bg-background">
        <div className="relative aspect-square">
          <Image
            src={resource.secure_url}
            alt={displayName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="size-9"
              asChild
            >
              <a
                href={resource.secure_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="size-9"
              onClick={handleCopyUrl}
            >
              <Copy className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="size-9 hover:bg-danger"
              onClick={() => setIsDeleteOpen(true)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
        <div className="p-2 flex items-center justify-between gap-2">
          <span className="text-xs truncate" title={displayName}>
            {displayName}
          </span>
          <Badge variant="outline" className="text-[10px] shrink-0">
            {resource.format}
          </Badge>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        close={() => setIsDeleteOpen(false)}
        title="Delete image"
        subtitle={`Are you sure you want to delete "${displayName}"? This action cannot be undone.`}
        deleteFile={() => onDelete(resource.public_id)}
      />
    </>
  );
}
