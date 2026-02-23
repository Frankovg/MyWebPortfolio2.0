"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { uploadMedia } from "@/actions/media-library-actions";
import { Spinner } from "@/components/primitives/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showErrorMessage } from "@/utils/showErrorMessage";

type UploadDialogProps = {
  currentFolder: string;
  onUploadComplete: () => void;
};

type FilePreview = {
  file: File;
  previewUrl: string;
};

export default function UploadDialog({
  currentFolder,
  onUploadComplete,
}: UploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const previews = selectedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...previews]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleClose = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    startTransition(async () => {
      let successCount = 0;

      for (const { file } of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", currentFolder);

        const result = await uploadMedia(formData);
        if ("message" in result) {
          showErrorMessage(result);
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(
          `${successCount} ${successCount === 1 ? "image" : "images"} uploaded`
        );
        onUploadComplete();
      }
      handleClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Upload className="size-4" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload images</DialogTitle>
          <DialogDescription>
            {currentFolder
              ? `Upload to ${currentFolder}/`
              : "Upload to root folder"}
          </DialogDescription>
        </DialogHeader>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
        />

        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {files.map((preview, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                <Image
                  src={preview.previewUrl}
                  alt={preview.file.name}
                  fill
                  className="object-cover"
                />
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

        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || isPending}
          >
            {isPending ? <Spinner /> : `Upload ${files.length || ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
