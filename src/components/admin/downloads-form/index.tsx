import { Download } from "@prisma/client";

import { Action } from "@/lib/types";

import { DownloadFormInitializer } from "./download-form-initializer";
import DownloadFormWrapper from "./sections/download-form-wrapper";

type DownloadsFormProps = {
  actionType: Action;
  download?: Download;
};

export const DownloadsForm = ({ actionType, download }: DownloadsFormProps) => {
  return (
    <DownloadFormInitializer download={download}>
      <DownloadFormWrapper actionType={actionType} />
    </DownloadFormInitializer>
  );
};
