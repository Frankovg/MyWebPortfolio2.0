import { useCallback, useState, useTransition } from "react";

import { getMediaLibraryData } from "@/actions/media-library-actions";

import type { MediaLibraryData } from "@/app/(admin)/admin/media-library/types/types";

type UseMediaLibraryDataOptions = {
  onError?: (result: { message: string }) => void;
};

export function useMediaLibraryData({ onError }: UseMediaLibraryDataOptions = {}) {
  const [data, setData] = useState<MediaLibraryData | null>(null);
  const [isLoading, startTransition] = useTransition();

  const fetchData = useCallback(
    (folder: string) => {
      startTransition(async () => {
        const result = await getMediaLibraryData(folder);
        if ("message" in result) {
          onError?.(result);
          return;
        }
        setData(result);
      });
    },
    [onError]
  );

  return { data, setData, isLoading, fetchData };
}
