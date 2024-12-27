import { getProjectBySlug } from "@/lib/server-utils"
import Test from "./components/test"

export default async function ProjectPage({
  params
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const project = await getProjectBySlug(slug)
  if (!project) throw new Error('Project not found')
  //TODO: Add banner container
  return (
    <Test project={project} />
  )
}