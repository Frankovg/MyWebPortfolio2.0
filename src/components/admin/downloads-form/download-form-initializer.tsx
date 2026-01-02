"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "@prisma/client";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { downloadFormSchema, TDownloadForm } from "@/lib/validations";
import { useDownloadFormStore } from "@/stores/use-download-form-store";

type DownloadFormInitializerProps = {
  download?: Download;
  children: React.ReactNode;
};

export function DownloadFormInitializer({
  download,
  children,
}: DownloadFormInitializerProps) {
  const setFormMethods = useDownloadFormStore((s) => s.setFormMethods);
  const setDownload = useDownloadFormStore((s) => s.setDownload);
  const setErrors = useDownloadFormStore((s) => s.setErrors);
  const reset = useDownloadFormStore((s) => s.reset);

  const [isInitialized, setIsInitialized] = useState(false);

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
      imageUrl: download?.imageUrl ?? "",
      alt: download?.alt ?? "",
      name: download?.name ?? "",
      description: download?.description ?? "",
      language: download?.language ?? "en",
      fileHref: download?.fileHref ?? "",
      format: download?.format ?? "",
      isActive: download?.isActive ?? false,
    },
  });

  useLayoutEffect(() => {
    setDownload(download);
    setFormMethods({
      register,
      control,
      errors,
      watch,
      getValues,
      trigger,
    });
    setIsInitialized(true);

    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setErrors(errors);
  }, [errors, setErrors]);

  if (!isInitialized) return null;

  return <>{children}</>;
}
