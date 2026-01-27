"use client";

import { toast } from "sonner";
import { create } from "zustand";

import { FALLBACK_IMG } from "@/lib/constants";
import { Action } from "@/lib/types";

import { useDownloadsStore } from "./use-downloads-store";

import type { Download } from "@/generated/prisma/client";
import type { TDownloadForm } from "@/lib/validations";
import type {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

type DownloadFormState = {
  isPending: boolean;
  download: Download | undefined;
  register: UseFormRegister<TDownloadForm> | null;
  control: Control<TDownloadForm> | null;
  errors: FieldErrors<TDownloadForm>;
  watch: UseFormWatch<TDownloadForm> | null;
  getValues: UseFormGetValues<TDownloadForm> | null;
  trigger: UseFormTrigger<TDownloadForm> | null;
};

type DownloadFormActions = {
  setIsPending: (isPending: boolean) => void;
  setDownload: (download: Download | undefined) => void;
  setFormMethods: (methods: {
    register: UseFormRegister<TDownloadForm>;
    control: Control<TDownloadForm>;
    errors: FieldErrors<TDownloadForm>;
    watch: UseFormWatch<TDownloadForm>;
    getValues: UseFormGetValues<TDownloadForm>;
    trigger: UseFormTrigger<TDownloadForm>;
  }) => void;
  setErrors: (errors: FieldErrors<TDownloadForm>) => void;
  onSubmit: (actionType: Action) => Promise<void>;
  reset: () => void;
};

type DownloadFormStore = DownloadFormState & DownloadFormActions;

const initialState: DownloadFormState = {
  isPending: false,
  download: undefined,
  register: null,
  control: null,
  errors: {},
  watch: null,
  getValues: null,
  trigger: null,
};

export const useDownloadFormStore = create<DownloadFormStore>((set, get) => ({
  ...initialState,

  setIsPending: (isPending) => set({ isPending }),

  setDownload: (download) => set({ download }),

  setFormMethods: (methods) =>
    set({
      register: methods.register,
      control: methods.control,
      errors: methods.errors,
      watch: methods.watch,
      getValues: methods.getValues,
      trigger: methods.trigger,
    }),

  setErrors: (errors) => set({ errors }),

  onSubmit: async (actionType) => {
    const { trigger, getValues, download } = get();

    if (!trigger || !getValues) {
      if (process.env.NODE_ENV === "development") {
        console.error("Form methods not initialized");
      }
      return;
    }

    set({ isPending: true });

    try {
      const result = await trigger();
      if (!result) {
        const errorMessage =
          "Form validation failed. Please check the highlighted fields and try again.";
        toast.error(errorMessage);
        console.warn(errorMessage);
        return;
      }

      const downloadValues = getValues();

      downloadValues.imageUrl = downloadValues.imageUrl || FALLBACK_IMG;

      const { addNewFile, handleEditFile } = useDownloadsStore.getState();

      if (actionType === "add") {
        await addNewFile(downloadValues);
      } else if (actionType === "edit") {
        await handleEditFile(download?.id ?? "", downloadValues);
      }
    } finally {
      set({ isPending: false });
    }
  },

  reset: () => set(initialState),
}));
