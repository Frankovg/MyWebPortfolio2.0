import type { MediaFolder, MediaResource } from "@/lib/types";

export type { MediaFolder };

export type MediaLibraryData = {
  resources: MediaResource[];
  folders: MediaFolder[];
  currentFolder: string;
};

export type FilePreview = {
  file: File;
  previewUrl: string;
};
