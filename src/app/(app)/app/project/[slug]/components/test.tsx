import { Project } from "@prisma/client"

function Test({ project }: { project?: Project }) {
  return (
    <h1 className="whitespace-pre-line">{`${project?.description}`}</h1>
  )
}

export default Test

