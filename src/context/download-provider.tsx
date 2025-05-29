"use client";

import { Action, DownloadEssentials } from "@/lib/types";
import { Download } from "@prisma/client";
import { createContext, startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type DownloadProviderProps = {
  children: React.ReactNode;
  data: Download[];
};

type TDownloadContext = {
  downloads: Download[];
};

type PayloadCreate = DownloadEssentials & { isActive: boolean };
type PayloadEdit = DownloadEssentials & {
  downloadId: string;
};
type PayloadDelete = { downloadId: string };
type Payload = PayloadCreate | PayloadEdit | PayloadDelete;

export const DownloadContext = createContext<TDownloadContext | null>(null);

export const DownloadProvider = ({ data, children }: DownloadProviderProps) => {
  const [optimisticDownloads, setOptimisticDownloads] = useOptimistic(
    data,
    (prev, { action, payload }: { action: Action; payload: Payload }) => {
      const now = new Date();
      switch (action) {
        case "add":
          const addPayload = payload as PayloadCreate;
          return [
            ...prev,
            {
              ...addPayload,
              id: Math.random().toString(),
              createdAt: now,
              updatedAt: now,
            },
          ];
        case "edit":
          return prev.map((download) => {
            if (
              !!("downloadId" in payload) &&
              download.id === payload.downloadId
            ) {
              return {
                ...download,
                ...payload,
                updatedAt: now,
              };
            }
            return download;
          });
        case "delete":
          if (!!("downloadId" in payload)) {
            return prev.filter(
              (download) => download.id !== payload.downloadId
            );
          }
          return prev;
        default:
          return prev;
      }
    }
  );

  return (
    <DownloadContext.Provider
      value={{
        downloads: optimisticDownloads,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export default DownloadProvider;
