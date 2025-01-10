import { redirect } from "next/navigation"
import { getFirstSoftwareProject } from "@/lib/server-utils"

export default async function Project() {
  const project = await getFirstSoftwareProject()

  if (!project) redirect('/app/home')

  redirect(`/app/project/${project?.slug}`)
}