import * as React from "react";

import { CustomGlobalError } from "@/components/custom-global-error";

export default async function NotFoundProject() {
  return <CustomGlobalError description="Project not found" label="go home" href="/home" />;
}
