import * as React from "react";

import { CustomGlobalError } from "@/components/custom-global-error";

export default function NotFoundDownload() {
  return <CustomGlobalError description="File not found" label="go to downloads" href="/admin/downloads" />;
}
