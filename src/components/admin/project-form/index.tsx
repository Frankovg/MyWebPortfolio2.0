import { ProjectFormProvider } from "@/context/project-form-provider";
import { Action, IProjectFull } from "@/lib/types";

import ProjectFormWrapper from "./sections/project-form-wrapper";

type ProjectFormProps = {
  actionType: Action;
  categoryId: string;
  project?: IProjectFull;
};

export function ProjectForm({
  actionType,
  categoryId,
  project,
}: ProjectFormProps) {
  return (
    <ProjectFormProvider project={project}>
      <ProjectFormWrapper actionType={actionType} categoryId={categoryId} />
    </ProjectFormProvider>
  );
}
