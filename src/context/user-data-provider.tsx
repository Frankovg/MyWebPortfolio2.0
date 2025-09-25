"use client";

import { Download } from "@prisma/client";
import { createContext, startTransition, useOptimistic } from "react";

import { addFile, deleteFile, editFile } from "@/actions/index";
import { Action, DownloadEssentials } from "@/lib/types";
import { showErrorMessage } from "@/utils/showErrorMessage";

type UserDataContextProviderProps = {
  data: {
    userData: {
      downloads: Download[];
    };
  };
  children: React.ReactNode;
};

type TUserDataContext = {
  downloads: Download[];
  addNewFile: (newFile: DownloadEssentials) => Promise<void>;
  handleDeleteFile: (downloadId: string) => Promise<void>;
  handleEditFile: (
    downloadId: string,
    download: DownloadEssentials
  ) => Promise<void>;
};

export const UserDataContext = createContext<TUserDataContext | null>(null);

type PayloadCreate = DownloadEssentials;
type PayloadEdit = DownloadEssentials & {
  downloadId: string;
};
type PayloadDelete = { downloadId: string };
type Payload = PayloadCreate | PayloadEdit | PayloadDelete;

const UserDataContextProvider = ({
  data,
  children,
}: UserDataContextProviderProps) => {
  const [optimisticDownloads, setOptimisticDownloads] = useOptimistic(
    data.userData.downloads,
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

  const addNewFile = async (newFile: DownloadEssentials) => {
    setOptimisticDownloads({
      action: "add",
      payload: { ...newFile },
    });
    const error = await addFile(newFile);
    if (!!error) {
      showErrorMessage(error);
      return;
    }
  };

  const handleDeleteFile = async (downloadId: string) => {
    startTransition(() => {
      setOptimisticDownloads({
        action: "delete",
        payload: { downloadId },
      });
    });

    const error = await deleteFile(downloadId);
    if (!!error) {
      showErrorMessage(error);
      return;
    }
  };

  const handleEditFile = async (
    downloadId: string,
    download: DownloadEssentials
  ) => {
    setOptimisticDownloads({
      action: "edit",
      payload: { downloadId, ...download },
    });
    const error = await editFile(downloadId, download);
    if (error) {
      showErrorMessage(error);
      return;
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        downloads: optimisticDownloads,
        addNewFile,
        handleDeleteFile,
        handleEditFile,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
