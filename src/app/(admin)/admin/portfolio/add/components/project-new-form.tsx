import ProjectForm from "@/components/project-form";

function ProjectNewForm({ categoryId }: { categoryId: string }) {
  return <ProjectForm actionType="add" categoryId={categoryId} />;
}

export default ProjectNewForm;
