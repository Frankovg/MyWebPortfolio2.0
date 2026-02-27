"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import {
  deleteMedia,
  getMediaLibraryData,
  searchMedia,
} from "@/actions/media-library-actions";
import { SearchInput } from "@/components/primitives/search-input";
import { showErrorMessage } from "@/utils/showErrorMessage";

import AddFolderDialog from "./add-folder-dialog";
import EditFolderDialog from "./edit-folder-dialog";
import FolderNav from "./folder-nav";
import ImageGrid from "./image-grid";
import { LoadingSkeleton } from "./loading-skeleton";
import UploadModal from "./upload-modal";

import type { MediaLibraryData } from "../types/types";

export default function MediaLibraryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folder = searchParams.get("folder") || "";

  const [data, setData] = useState<MediaLibraryData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, startTransition] = useTransition();

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchData = useCallback(
    (targetFolder: string) => {
      startTransition(async () => {
        const result = await getMediaLibraryData(targetFolder);
        if ("message" in result) {
          showErrorMessage(result);
          return;
        }
        setData(result);
      });
    },
    []
  );

  useEffect(() => {
    setSearchQuery("");
    fetchData(folder);
  }, [folder, fetchData]);

  const handleNavigate = (targetFolder: string) => {
    const params = new URLSearchParams();
    if (targetFolder) params.set("folder", targetFolder);
    router.push(`/admin/media-library${params.toString() ? `?${params}` : ""}`);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      fetchData(folder);
      return;
    }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const result = await searchMedia(value, folder);
        if ("message" in result) {
          showErrorMessage(result);
          return;
        }
        setData((prev) =>
          prev ? { ...prev, resources: result.resources } : null
        );
      });
    }, 300);
  };

  const handleDelete = async (publicId: string) => {
    const result = await deleteMedia(publicId);
    if (result && "message" in result) {
      showErrorMessage(result);
      return;
    }
    setData((prev) =>
      prev
        ? {
          ...prev,
          resources: prev.resources.filter((r) => r.public_id !== publicId),
        }
        : null
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <SearchInput
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="space-x-4 flex items-center">
          <UploadModal
            currentFolder={folder}
            onUploadComplete={(newResources) =>
              setData((prev) =>
                prev
                  ? { ...prev, resources: [...newResources, ...prev.resources] }
                  : null
              )
            }
          />
          <AddFolderDialog
            currentFolder={folder}
            onFolderCreated={() => fetchData(folder)}
          />
          {folder && (
            <EditFolderDialog
              currentFolder={folder}
              onFolderUpdated={(newPath) => handleNavigate(newPath ?? "")}
            />
          )}
        </div>
      </div>

      {isLoading || !data ? (
        <LoadingSkeleton />
      ) : (
        <>
          <FolderNav
            currentFolder={data.currentFolder}
            folders={data.folders}
            onNavigate={handleNavigate}
          />
          <ImageGrid resources={data.resources} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}
