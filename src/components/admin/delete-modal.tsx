"use client";

import { useTransition } from "react";

import { Spinner } from "@/components/primitives/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteModalProps {
  close: () => void;
  isOpen: boolean;
  title: string;
  subtitle: string;
  deleteFile: () => Promise<void>;
}

export default function DeleteModal({
  close,
  isOpen,
  title,
  subtitle,
  deleteFile,
}: DeleteModalProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
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
                await deleteFile();
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
