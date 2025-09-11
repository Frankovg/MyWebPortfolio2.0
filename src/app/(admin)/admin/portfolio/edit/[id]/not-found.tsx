import * as React from "react";

import { CustomGlobalError } from "@/components/custom-global-error";

export default function NotFoundProject() {
  return <CustomGlobalError description="Project not found" label="go to portfolio" href="/admin/portfolio" />;
}
