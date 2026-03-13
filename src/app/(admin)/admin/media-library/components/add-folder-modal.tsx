"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { createFolder } from "@/actions/media-library-actions";
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
import { Input } from "@/components/ui/input";
import { showErrorMessage } from "@/utils/showErrorMessage";

type AddFolderDialogProps = {
  currentFolder: string;
  onFolderCreated: () => void;
};

export default function AddFolderModal({
  currentFolder,
  onFolderCreated,
}: AddFolderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setName("");
    setIsOpen(false);
  };

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const fullPath = currentFolder ? `${currentFolder}/${trimmed}` : trimmed;

    startTransition(async () => {
      const result = await createFolder(fullPath);
      if ("message" in result) {
        showErrorMessage(result);
        return;
      }
      toast.success(`Folder "${trimmed}" created`);
      onFolderCreated();
      handleClose();
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}
    >
      <DialogTrigger asChild>
        <ButtonMinimal title="+ Add folder" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
          <DialogDescription>
            {currentFolder
              ? `Create a subfolder inside ${currentFolder}/`
              : "Create a new root folder"}
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          className="my-4"
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
            onClick={handleCreate}
            disabled={!name.trim() || isPending}
            className="w-24 max-sm:w-full"
          >
            {isPending ? <Spinner /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
