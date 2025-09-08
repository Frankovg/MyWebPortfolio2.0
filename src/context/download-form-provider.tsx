"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useTransition } from "react";
import { flushSync } from "react-dom";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";

import { useUserDataContext } from "@/hooks/use-user-data-context";
import { FALLBACK_IMG } from "@/lib/constants";
import { Action } from "@/lib/types";
import { downloadFormSchema, TDownloadForm } from "@/lib/validations";

type DownloadFormContextType = {
  onSubmit: (actionType: Action) => Promise<void>;
  isPending: boolean;
  register: UseFormRegister<TDownloadForm>;
  control: Control<TDownloadForm>;
  errors: FieldErrors<TDownloadForm>;
  watch: UseFormWatch<TDownloadForm>;
  getValues: UseFormGetValues<TDownloadForm>;
  trigger: UseFormTrigger<TDownloadForm>;
};

export const DownloadFormContext = createContext<
  DownloadFormContextType | undefined
>(undefined);

type DownloadFormProviderProps = {
  children: ReactNode;
  download?: Download;
};

export function DownloadFormProvider({
  children,
  download,
}: DownloadFormProviderProps) {
  const [isPending, startTransition] = useTransition();
  const { addNewFile, handleEditFile } = useUserDataContext();

  const router = useRouter();

  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<TDownloadForm>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      imageUrl: download?.imageUrl || "",
      alt: download?.alt || "",
      name: download?.name || "",
      description: download?.description || "",
      language: download?.language || "en",
      fileHref: download?.fileHref || "",
      format: download?.format || "",
      isActive: download?.isActive || false,
    },
  });

  const onSubmit = async (actionType: Action) => {
    startTransition(async () => {
      const result = await trigger();
      if (!result) {
        const errorMessage =
          "Form validation failed. Please check the highlighted fields and try again.";
        toast.error(errorMessage);
        console.warn(errorMessage);
        return;
      }

      flushSync(() => {
        router.push("/admin/downloads");
      });

      const downloadValues = getValues();
      downloadValues.imageUrl = downloadValues.imageUrl || FALLBACK_IMG;
      downloadValues.language = "en"

      if (actionType === "add") {
        await addNewFile(downloadValues);
      } else if (actionType === "edit") {
        await handleEditFile(download?.id ?? "", downloadValues);
      }
    });
  };

  return (
    <DownloadFormContext.Provider
      value={{
        onSubmit,
        register,
        trigger,
        isPending,
        control,
        errors,
        watch,
        getValues,
      }}
    >
      {children}
    </DownloadFormContext.Provider>
  );
}
