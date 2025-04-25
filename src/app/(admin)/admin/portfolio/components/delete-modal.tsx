"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/hooks/use-project-context";
import { useTransition } from "react";
import { Spinner } from "@/components/primitives/spinner";

interface DeleteModalProps {
  close: () => void;
  isOpen: boolean;
  data: {
    projectId: string;
    categoryId: string;
  };
}

export default function DeleteModal({ close, isOpen, data }: DeleteModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleDeleteProject } = useProjectContext();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this project?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter>
          <Button variant="secondary" onClick={close} className="w-24">
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              startTransition(async () => {
                await handleDeleteProject(data.projectId, data.categoryId);
                close();
              })
            }
            className="hover:bg-danger w-24"
          >
            {isPending ? <Spinner /> : "Accept"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
