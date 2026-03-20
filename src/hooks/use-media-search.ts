import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { searchMedia } from "@/actions/media-library-actions";

import type { MediaLibraryData } from "@/app/(admin)/admin/media-library/types/types";

type UseMediaSearchOptions = {
  currentFolder: string;
  fetchData: (folder: string) => void;
  setData: React.Dispatch<React.SetStateAction<MediaLibraryData | null>>;
  onError?: (result: { message: string }) => void;
};

export function useMediaSearch({
  currentFolder,
  fetchData,
  setData,
  onError,
}: UseMediaSearchOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (!value.trim()) {
        fetchData(currentFolder);
        return;
      }

      debounceRef.current = setTimeout(() => {
        startTransition(async () => {
          const result = await searchMedia(value, currentFolder);
          if ("message" in result) {
            onError?.(result);
            return;
          }
          setData((prev) =>
            prev ? { ...prev, resources: result.resources } : null
          );
        });
      }, 300);
    },
    [currentFolder, fetchData, setData, onError]
  );

  const clearSearch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchQuery("");
  }, []);

  return { searchQuery, isSearching, handleSearch, clearSearch };
}
