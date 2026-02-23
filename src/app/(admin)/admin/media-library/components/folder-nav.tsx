"use client";

import { Folder, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { MediaFolder } from "../types";

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
          <Home className="size-4" />
          Root
        </Button>
        {segments.map((segment, i) => {
          const path = segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <span key={path} className="flex items-center gap-1">
              <span className="text-muted-foreground">/</span>
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
        <div className="flex flex-wrap gap-2">
          {folders.map((folder) => (
            <Button
              key={folder.path}
              variant="outline"
              size="sm"
              className="gap-2"
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
