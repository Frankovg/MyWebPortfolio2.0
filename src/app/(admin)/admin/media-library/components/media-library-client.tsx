"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { deleteMedia } from "@/actions/media-library-actions";
import FolderNav from "@/components/admin/media-picker/folder-nav";
import { MediaSearchInput } from "@/components/admin/media-picker/media-search-input";
import { MediaLibrarySkeleton } from "@/components/skeletons/media-library-skeleton";
import { useMediaLibraryData } from "@/hooks/use-media-library-data";
import { useMediaSearch } from "@/hooks/use-media-search";
import { showErrorMessage } from "@/utils/showErrorMessage";


import AddFolderModal from "./add-folder-modal";
import EditFolderModal from "./edit-folder-modal";
import ImageGrid from "./image-grid";
import UploadModal from "./upload-modal";


export default function MediaLibraryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folder = searchParams.get("folder") || "";

  const { data, setData, isLoading, fetchData } = useMediaLibraryData({
    onError: showErrorMessage,
  });

  const { searchQuery, handleSearch, clearSearch, isSearching } = useMediaSearch({
    currentFolder: folder,
    fetchData,
    setData,
    onError: showErrorMessage,
  });

  useEffect(() => {
    clearSearch();
    fetchData(folder);
  }, [folder, fetchData, clearSearch]);

  const handleNavigate = (targetFolder: string) => {
    const params = new URLSearchParams();
    if (targetFolder) params.set("folder", targetFolder);
    router.push(`/admin/media-library${params.toString() ? `?${params}` : ""}`);
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
      <div className="w-full flex justify-between gap-3 md:max-lg:flex-col md:max-lg:gap-5 md:max-lg:items-end max-600:flex-col max-600:gap-5 max-600:items-end">
        <MediaSearchInput
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="gap-4 flex items-start justify-end flex-wrap">
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
          {folder && (
            <EditFolderModal
              currentFolder={folder}
              onFolderUpdated={(newPath) => handleNavigate(newPath ?? "")}
            />
          )}
          <AddFolderModal
            currentFolder={folder}
            onFolderCreated={() => fetchData(folder)}
          />
        </div>
      </div>

      {isLoading || !data || isSearching ? (
        <MediaLibrarySkeleton />
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
