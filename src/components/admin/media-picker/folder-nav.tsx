"use client";

import { ChevronRight, Folder } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { MediaFolder } from "@/lib/types";

type FolderNavProps = {
  currentFolder: string;
  folders: MediaFolder[];
  onNavigate: (folder: string) => void;
};

export default function FolderNav({
  currentFolder,
  folders,
  onNavigate,
}: FolderNavProps) {
  const segments = currentFolder ? currentFolder.split("/") : [];

  return (
    <div className="space-y-3">
      <nav className="flex items-center gap-1 text-sm">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 px-2"
          onClick={() => onNavigate("")}
        >
          Root
        </Button>
        {segments.map((segment, i) => {
          const path = segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <span key={path} className="flex items-center gap-1">
              <ChevronRight className="size-3.5" />
              {isLast ? (
                <span className="px-2 font-medium">{segment}</span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => onNavigate(path)}
                >
                  {segment}
                </Button>
              )}
            </span>
          );
        })}
      </nav>

      {folders.length > 0 && (
        <div className="flex flex-wrap gap-4 lg:gap-2">
          {folders.map((folder) => (
            <Button
              key={folder.path}
              variant="outline"
              size="sm"
              className="gap-2 rounded-none opacity-75 hover:opacity-100"
              onClick={() => onNavigate(folder.path)}
            >
              <Folder className="size-4" />
              {folder.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
