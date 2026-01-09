
import { DownloadFormInitializer } from "./download-form-initializer";
import DownloadFormWrapper from "./sections/download-form-wrapper";

import type { Download } from "@/generated/prisma/client";
import type { Action } from "@/lib/types";

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
