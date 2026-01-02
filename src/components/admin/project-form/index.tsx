import { Action, IProjectFull } from "@/lib/types";

import { ProjectFormInitializer } from "./project-form-initializer";
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
    <ProjectFormInitializer project={project}>
      <ProjectFormWrapper actionType={actionType} categoryId={categoryId} />
    </ProjectFormInitializer>
  );
}
