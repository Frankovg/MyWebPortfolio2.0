"use client";

import { Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { uploadMedia } from "@/actions/media-library-actions";
import ButtonMinimal from "@/components/primitives/button-minimal";
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

import UploadModalContent from "./upload-modal-content";

import type { FilePreview } from "../types/types";
import type { MediaResource } from "@/lib/types";

type UploadDialogProps = {
  currentFolder: string;
  onUploadComplete: (newResources: MediaResource[]) => void;
};

export default function UploadModal({
  currentFolder,
  onUploadComplete,
}: UploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
    setSizeError(null);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    startTransition(async () => {
      const uploaded: MediaResource[] = [];

      for (const { file } of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", currentFolder);

        const result = await uploadMedia(formData);
        if ("message" in result) {
          showErrorMessage(result);
        } else {
          uploaded.push(result.resource);
        }
      }

      if (uploaded.length > 0) {
        toast.success(
          `${uploaded.length} ${uploaded.length === 1 ? "image" : "images"} uploaded`
        );
        onUploadComplete(uploaded);
      }
      handleClose();
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}
    >
      <DialogTrigger asChild>
        <ButtonMinimal
          title={(
            <>
              <Upload />
              <span>Upload</span>
            </>
          )}
        />
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

        <UploadModalContent
          files={files}
          inputRef={inputRef}
          setFiles={setFiles}
          setSizeError={setSizeError}
          sizeError={sizeError ?? undefined}
        />

        <DialogFooter className="gap-4">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="w-24 max-sm:w-full"
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleUpload}
            disabled={files.length === 0 || isPending}
            className="w-24 max-sm:w-full"
          >
            {isPending ? <Spinner /> : `Upload ${files.length || ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
