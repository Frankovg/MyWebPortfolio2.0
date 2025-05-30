"use client";

import { Action, DownloadEssentials } from "@/lib/types";
import { Download } from "@prisma/client";
import { createContext, useOptimistic } from "react";

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
};

export const UserDataContext = createContext<TUserDataContext | null>(null);

type PayloadCreate = DownloadEssentials & { isActive: boolean };
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

  return (
    <UserDataContext.Provider
      value={{
        downloads: data.userData.downloads,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
