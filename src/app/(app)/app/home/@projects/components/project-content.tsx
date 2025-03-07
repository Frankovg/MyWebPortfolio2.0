import { TabsContent } from "@/components/ui/tabs";
import ProjectCard from "./project-card";
import { ICategoryWithProjects } from "@/lib/types";

type ProjectContentProps = {
  content: ICategoryWithProjects;
  isCurrentTab: boolean;
  isNextTab: boolean;
};

function ProjectContent({
  content,
  isCurrentTab,
  isNextTab,
}: ProjectContentProps) {
  return (
    <TabsContent
      value={content.value}
      className={`m-0 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4 transition-all duration-300 ease-out ${
        isCurrentTab ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${isNextTab && "opacity-0 translate-y-2"}`}
    >
      {content.projects.map((project, index) => {
        if (index <= 5) {
          return <ProjectCard key={project.id} project={project} />;
        }
      })}
    </TabsContent>
  );
}

export default ProjectContent;
