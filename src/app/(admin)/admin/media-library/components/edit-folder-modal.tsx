"use client";

import { FolderPen } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  deleteFolder,
  renameFolder,
} from "@/actions/media-library-actions";
import DeleteModal from "@/components/admin/delete-modal";
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

type EditFolderDialogProps = {
  currentFolder: string;
  onFolderUpdated: (newPath?: string) => void;
};

export default function EditFolderModal({
  currentFolder,
  onFolderUpdated,
}: EditFolderDialogProps) {
  const folderName = currentFolder.split("/").pop() || currentFolder;
  const parentPath = currentFolder.includes("/")
    ? currentFolder.substring(0, currentFolder.lastIndexOf("/"))
    : "";

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(folderName);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setName(folderName);
    setIsOpen(false);
  };

  const handleRename = () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === folderName) return;

    const newPath = parentPath ? `${parentPath}/${trimmed}` : trimmed;

    startTransition(async () => {
      const result = await renameFolder(currentFolder, newPath);
      if ("message" in result) {
        showErrorMessage(result);
        setIsOpen(false)
        return;
      }
      toast.success(`Folder renamed to "${trimmed}"`);
      handleClose();
      onFolderUpdated(newPath);
    });
  };

  const handleDelete = async () => {
    const result = await deleteFolder(currentFolder);
    if (result && "message" in result) {
      showErrorMessage(result);
      setIsDeleteOpen(false)
      return;
    }
    toast.success(`Folder "${folderName}" deleted`);
    setIsDeleteOpen(false);
    handleClose();
    onFolderUpdated();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}
      >
        <DialogTrigger asChild>
          <ButtonMinimal
            title={(
              <>
                <FolderPen />
                <span>Edit folder</span>
              </>
            )}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit folder</DialogTitle>
            <DialogDescription>
              Rename or delete &quot;{folderName}&quot;
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="my-4"
          />
          <DialogFooter className="flex sm:justify-between! gap-4">
            <Button
              variant="destructive"
              className="hover:bg-danger underline"
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete folder
            </Button>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="w-24 max-sm:w-full"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={handleRename}
                disabled={!name.trim() || name.trim() === folderName || isPending}
                className="w-24 max-sm:w-full"
              >
                {isPending ? <Spinner /> : "Rename"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteModal
        isOpen={isDeleteOpen}
        close={() => setIsDeleteOpen(false)}
        title="Delete folder"
        subtitle={`Are you sure you want to delete "${folderName}" and ALL its contents? This action cannot be undone.`}
        deleteFile={handleDelete}
      />
    </>
  );
}
