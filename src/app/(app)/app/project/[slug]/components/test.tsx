import { Project } from "@prisma/client"

function Test({ project }: { project?: Project }) {
  const formattedDescription = project?.description.replace(/\s{2,}/g, '\n')
  return (
    <h1 className="whitespace-pre-line">{formattedDescription}</h1>
  )
}

export default Test

