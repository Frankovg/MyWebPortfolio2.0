import type { MediaFolder } from "@/lib/types";

export type { MediaFolder };

export type MediaResource = {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  resource_type: string;
};

export type MediaLibraryData = {
  resources: MediaResource[];
  folders: MediaFolder[];
  currentFolder: string;
};

export type FilePreview = {
  file: File;
  previewUrl: string;
};
