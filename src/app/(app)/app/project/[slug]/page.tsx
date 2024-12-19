import { getProjectBySlug } from "@/lib/server-utils"
import Test from "./components/test"

type ProjectPageParams = {
  params: {
    slug: string
  }
}

export default async function ProjectPage({
  params
}: ProjectPageParams) {

  const project = await getProjectBySlug(params?.slug)
  if (!project) throw new Error('Project not found')

  return (
    <Test project={project} />
  )
}