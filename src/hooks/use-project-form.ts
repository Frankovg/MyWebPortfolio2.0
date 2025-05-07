import { ProjectFormContext } from "@/context/project-form-provider";
import { useContext } from "react";

export function useProjectFormContext() {
  const context = useContext(ProjectFormContext);

  if (!context) {
    throw new Error(
      "useProjectFormContext must be used within a ProjectFormProvider"
    );
  }

  return context;
}
