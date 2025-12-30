import { Download } from "@prisma/client";
import { create } from "zustand";

import { addFile, deleteFile, editFile } from "@/actions/index";
import { DownloadEssentials } from "@/lib/types";
import { showErrorMessage } from "@/utils/showErrorMessage";

type DownloadsState = {
  downloads: Download[];
  originalDownloads: Download[];
};

type DownloadsActions = {
  setDownloads: (downloads: Download[]) => void;
  applyOptimisticAdd: (newFile: DownloadEssentials) => void;
  applyOptimisticEdit: (downloadId: string, download: DownloadEssentials) => void;
  applyOptimisticDelete: (downloadId: string) => void;
  rollback: () => void;
  addNewFile: (newFile: DownloadEssentials) => Promise<void>;
  handleEditFile: (downloadId: string, download: DownloadEssentials) => Promise<void>;
  handleDeleteFile: (downloadId: string) => Promise<void>;
  reset: () => void;
};

type DownloadsStore = DownloadsState & DownloadsActions;

const initialState: DownloadsState = {
  downloads: [],
  originalDownloads: [],
};

export const useDownloadsStore = create<DownloadsStore>((set, get) => ({
  ...initialState,

  setDownloads: (downloads) =>
    set({
      downloads,
      originalDownloads: downloads,
    }),

  applyOptimisticAdd: (newFile) =>
    set((state) => {
      const now = new Date();
      return {
        originalDownloads: state.downloads,
        downloads: [
          ...state.downloads,
          {
            ...newFile,
            id: Math.random().toString(),
            createdAt: now,
            updatedAt: now,
          },
        ],
      };
    }),

  applyOptimisticEdit: (downloadId, download) =>
    set((state) => ({
      originalDownloads: state.downloads,
      downloads: state.downloads.map((d) =>
        d.id === downloadId
          ? { ...d, ...download, updatedAt: new Date() }
          : d
      ),
    })),

  applyOptimisticDelete: (downloadId) =>
    set((state) => ({
      originalDownloads: state.downloads,
      downloads: state.downloads.filter((d) => d.id !== downloadId),
    })),

  rollback: () =>
    set((state) => ({
      downloads: state.originalDownloads,
    })),

  addNewFile: async (newFile) => {
    const { applyOptimisticAdd, rollback } = get();

    applyOptimisticAdd(newFile);

    const error = await addFile(newFile);
    if (error) {
      rollback();
      showErrorMessage(error);
    }
  },

  handleEditFile: async (downloadId, download) => {
    const { applyOptimisticEdit, rollback } = get();

    applyOptimisticEdit(downloadId, download);

    const error = await editFile(downloadId, download);
    if (error) {
      rollback();
      showErrorMessage(error);
    }
  },

  handleDeleteFile: async (downloadId) => {
    const { applyOptimisticDelete, rollback } = get();

    applyOptimisticDelete(downloadId);

    const error = await deleteFile(downloadId);
    if (error) {
      rollback();
      showErrorMessage(error);
    }
  },

  reset: () => set(initialState),
}));
