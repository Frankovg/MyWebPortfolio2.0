import { useContext } from "react";

import { ProjectFormContext } from "@/context/project-form-provider";

export function useProjectFormContext() {
  const context = useContext(ProjectFormContext);

  if (!context) {
    throw new Error(
      "useProjectFormContext must be used within a ProjectFormProvider"
    );
  }

  return context;
}
