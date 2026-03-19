"use client";

import { ImagePlus } from "lucide-react";
import { useState } from "react";

import FolderNav from "@/components/admin/media-picker/folder-nav";
import { MediaLibrarySkeleton } from "@/components/skeletons/media-library-skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaLibraryData } from "@/hooks/use-media-library-data";
import { useMediaSearch } from "@/hooks/use-media-search";
import { showErrorMessage } from "@/utils/showErrorMessage";

import { MediaSearchInput } from "./media-search-input";
import PickerImageGrid from "./picker-image-grid";

import type { MediaResource } from "@/app/(admin)/admin/media-library/types/types";

type MediaPickerModalProps = {
  onSelect: (url: string) => void;
};

export default function MediaPickerModal({
  onSelect,
}: MediaPickerModalProps) {
  const [open, setOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, setData, isLoading, fetchData } = useMediaLibraryData({
    onError: showErrorMessage,
  });

  const { searchQuery, handleSearch, clearSearch, isSearching } = useMediaSearch({
    currentFolder,
    fetchData,
    setData,
    onError: showErrorMessage,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setCurrentFolder("");
      clearSearch();
      setSelected(new Set());
      fetchData("");
    } else {
      setSelected(new Set());
    }
  };

  const handleNavigate = (folder: string) => {
    clearSearch();
    setCurrentFolder(folder);
    setSelected(new Set());
    fetchData(folder);
  };

  const handleToggle = (resource: MediaResource) => {
    const url = resource.secure_url;
    setSelected((prev) => (prev.has(url) ? new Set() : new Set([url])));
  };

  const handleConfirm = () => {
    const [firstUrl] = selected;
    if (!firstUrl) return;

    onSelect(firstUrl);
    setOpen(false);
    setSelected(new Set());
  };

  const handleCancel = () => {
    setOpen(false);
    setSelected(new Set());
  };

  const imageResources =
    data?.resources.filter((r) => r.format !== "pdf") ?? [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Browse media library"
          aria-label="Browse media library"
        >
          <ImagePlus className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="py-4 px-1.5">
          <MediaSearchInput
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-600:w-full md:max-lg:w-full"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {isLoading || !data || isSearching ? (
            <MediaLibrarySkeleton />
          ) : (
            <>
              <FolderNav
                currentFolder={data.currentFolder}
                folders={data.folders}
                onNavigate={handleNavigate}
              />
              <PickerImageGrid
                resources={imageResources}
                selectedUrls={selected}
                onToggle={handleToggle}
              />
            </>
          )}
        </div>

        <DialogFooter className="gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            className="w-24 max-sm:w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleConfirm}
            disabled={selected.size === 0}
            className="w-24 max-sm:w-full"
          >
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}


