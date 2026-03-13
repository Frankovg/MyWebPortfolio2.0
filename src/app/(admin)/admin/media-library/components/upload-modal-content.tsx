import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";

import { MAX_FILE_SIZE } from "../constants/constants";
import { FilePreview } from "../types/types";

import PdfCard from "./pdf-card";

type UploadModalContentProps = {
  setFiles: Dispatch<SetStateAction<FilePreview[]>>
  setSizeError: Dispatch<SetStateAction<string | null>>
  sizeError?: string
  inputRef: RefObject<HTMLInputElement | null>
  files: FilePreview[]
}

export default function UploadModalContent({
  setFiles,
  setSizeError,
  sizeError,
  inputRef,
  files
}: UploadModalContentProps) {


  const removeFile = (index: number) => {
    setFiles((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const { valid, rejected } = selectedFiles.reduce<{
      valid: File[];
      rejected: string[];
    }>(
      (acc, file) => {
        if (file.size > MAX_FILE_SIZE) {
          acc.rejected.push(file.name);
        } else {
          acc.valid.push(file);
        }
        return acc;
      },
      { valid: [], rejected: [] }
    );

    if (rejected.length > 0) {
      setSizeError(`${rejected.join(", ")} exceeded 4.5MB limit`);
    } else {
      setSizeError(null);
    }

    const previews = valid.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...previews]);
  };

  return (
    <div className="py-4 px-1.5 space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/webp, .pdf"
        multiple
        onChange={handleFileChange}
        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-darkGrey hover:file:cursor-pointer cursor-pointer"
      />
      {sizeError && (
        <p className="text-sm text-danger">{sizeError}</p>
      )}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
          {files.map((preview, i) => (
            <div key={i} className="relative aspect-square rounded-md border border-softGrey overflow-hidden">
              {preview.file.type === "application/pdf" ? (
                <PdfCard />
              ) : (
                <Image
                  src={preview.previewUrl}
                  alt={preview.file.name}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 rounded-full bg-black/70 p-0.5 text-white hover:bg-black"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
