"use client";

import { FolderPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { createFolder } from "@/actions/media-library-actions";
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

export default function AddFolderDialog({
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
    <Dialog open={isOpen} onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FolderPlus className="size-4" />
          Add folder
        </Button>
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
          autoFocus
        />
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim() || isPending}>
            {isPending ? <Spinner /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
