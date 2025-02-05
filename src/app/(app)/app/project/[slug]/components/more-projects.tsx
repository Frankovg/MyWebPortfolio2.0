import { ICategoryWithProjects } from "@/lib/types"

type PrevOrNextProject = ICategoryWithProjects['projects'][0] | null

type MoreProjectsProps = {
  data: {
    categories: ICategoryWithProjects[],
    prevProject: PrevOrNextProject,
    nextProject: PrevOrNextProject
  }
}

function MoreProjects({ data }: MoreProjectsProps) {

  return (
    <></>
  )
}

export default MoreProjects