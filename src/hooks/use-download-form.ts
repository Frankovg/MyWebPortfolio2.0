import { useContext } from "react";

import { DownloadFormContext } from "@/context/download-form-provider";

export function useDownloadFormContext() {
  const context = useContext(DownloadFormContext);

  if (!context) {
    throw new Error(
      "useDownloadFormContext must be used within a DownloadFormProvider"
    );
  }

  return context;
}
