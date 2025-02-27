import H4 from "@/components/h4"
import { ProjectShort } from "@/lib/types"

import MobileProjectImagesContainer from "./mobile-project-images-container"
import ProjectCarousel from "./project-carousel"
import ProjectInfo from "./project-info"

type ProjectMainInfoProps = {
  project: ProjectShort
}

function ProjectMainInfo({ project }: ProjectMainInfoProps) {
  return (
    <>
      <H4 className="600:pt-24">{project.title}</H4>
      <div className="grid grid-cols-12 grid-flow-row gap-0 mb-12">
        <div className="max-600:hidden 1100:col-span-7 col-span-12">
          <ProjectCarousel images={project.gallery} />
        </div>
        <div className="1100:col-start-8 1100:col-span-5 1100:pl-8 col-span-12 600:max-1100:pt-24">
          <ProjectInfo project={project} />
        </div>
        <div className="600:hidden 1100:col-span-7 col-span-12 pt-24">
          <MobileProjectImagesContainer images={project.gallery} />
        </div>
      </div>
    </>
  )
}
export default ProjectMainInfo