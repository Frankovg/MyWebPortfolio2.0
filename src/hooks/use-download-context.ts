import { DownloadContext } from "@/context/download-provider";
import { useContext } from "react";

export function useDownloadContext() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error(
      "useDownloadContext must be used within a DownloadProvider"
    );
  }

  return context;
}
