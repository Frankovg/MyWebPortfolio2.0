"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { Action } from "@/lib/types";
import {
  downloadFormSchema,
  projectFormSchema,
  TDownloadForm,
  TProjectForm,
} from "@/lib/validations";
import { Download } from "@prisma/client";

type DownloadFormContextType = {
  onSubmit: () => Promise<void>;
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
      alt: download?.alt || null,
      name: download?.name || "",
      description: download?.description || "",
      fileHref: download?.fileHref || "",
      format: download?.format || "",
      isActive: download?.isActive || false,
    },
  });

  const onSubmit = async () => {
    startTransition(async () => {});
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
