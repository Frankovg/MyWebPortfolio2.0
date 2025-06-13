import { Download } from "@prisma/client";

import { DownloadFormProvider } from "@/context/download-form-provider";
import { Action } from "@/lib/types";

import DownloadFormWrapper from "./sections/download-form-wrapper";

type DownloadsFormProps = {
  actionType: Action;
  download?: Download;
};

export const DownloadsForm = ({ actionType, download }: DownloadsFormProps) => {
  return (
    <DownloadFormProvider download={download}>
      <DownloadFormWrapper actionType={actionType} />
    </DownloadFormProvider>
  );
};
