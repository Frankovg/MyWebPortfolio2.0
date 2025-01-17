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
    return buttons
  }

  const getHeaderData = (project: Project) => {
    const data = []
    if (project.company) data.push({ type: 'Developed at', name: project.company, url: project.companyUrl ?? undefined })
    if (project.client) data.push({ type: 'Client:', name: project.client, url: project.clientUrl ?? undefined })
    return data
  }

  return (
    <Card className="border-none">
      <CardHeader className="pt-0">
        <HeadOfDescription data={getHeaderData(project)} />
      </CardHeader>
      <CardContent>
        <LongDescription description={getFormattedDescription(project.description)} />
      </CardContent>
      <CardFooter className="flex gap-4">
        <LinkButtons data={getLinkButtons(project)} />
      </CardFooter>
    </Card>
  )
}

export default ProjectInfo
