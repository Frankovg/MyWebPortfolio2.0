import { NEXT, PREV } from "@/lib/constants"
import { ICategoryWithOneProject, PrevOrNextProject } from "@/lib/types"
import ProjectPaginationCard from "./project-pagination-card"

type MoreProjectsProps = {
  data: {
    categories: ICategoryWithOneProject[],
    prevProject: PrevOrNextProject,
    nextProject: PrevOrNextProject
  }
}

function MoreProjects({ data }: MoreProjectsProps) {
  const { categories, prevProject, nextProject } = data
  console.log(categories);
  //TODO: Add categories cards
  return (
    <div className="mt-32 w-full flex flex-col 800:flex-row justify-between items-center gap-8 1100:gap-12">
      <ProjectPaginationCard project={prevProject} type={PREV} />
      <ProjectPaginationCard project={nextProject} type={NEXT} />
    </div>
  )
}

export default MoreProjects