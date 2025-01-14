import { Project } from "@prisma/client"
import LinkButtons from "./link-buttons"
import LongDescription from "./long-description"
import HeadOfDescription from "./head-of-description"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

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
    <Card>
      <CardHeader>
        <HeadOfDescription data={getHeaderData(project)} />
      </CardHeader>
      <CardContent>
        <LongDescription description={getFormattedDescription(project.description)} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <LinkButtons data={getLinkButtons(project)} />
      </CardFooter>
    </Card>
  )
}

export default ProjectInfo
