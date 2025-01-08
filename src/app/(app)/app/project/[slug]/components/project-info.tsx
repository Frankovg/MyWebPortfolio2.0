import { Project } from "@prisma/client"
import LinkButtons from "./link-buttons"
import LongDescription from "./long-description"
import HeadOfDescription from "./head-of-description"

type ProjectInfoProps = {
  project?: Project
}

function ProjectInfo({ project }: ProjectInfoProps) {
  if (!project) return null

  const getFormattedDescription = (description: string) => {
    return description.replace(/\s{2,}/g, '\n').replace(/\n/g, '\n\n')
  }

  const getLinkButtons = (project: Project) => {
    const buttons = []
    if (project.repository) buttons.push({ name: 'Repository', url: project.repository })
    if (project.websiteUrl) buttons.push({ name: 'Website', url: project.websiteUrl })
    if (project.videoUrl) buttons.push({ name: 'Video', url: project.videoUrl })
    return buttons
  }

  const getHeaderData = (project: Project) => {
    const data = []
    if (project.company) data.push({ name: 'Developed at', url: project.company })
    if (project.client) data.push({ name: 'Client:', url: project.client })
    return data
  }

  return (
    <div className="w-full h-auto flex flex-col space-y-6">
      <HeadOfDescription data={getHeaderData(project)} />
      <LongDescription description={getFormattedDescription(project.description)} />
      <LinkButtons data={getLinkButtons(project)} />
    </div>
  )
}

export default ProjectInfo
