import ImageWithFallback from "@/components/image-with-fallback"
import { FALLBACK_IMG, NEXT, PREV } from "@/lib/constants"
import { ICategoryWithProjects, PrevOrNextProject } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProjectPaginationCard from "./project-pagination-card"

type MoreProjectsProps = {
  data: {
    categories: ICategoryWithProjects[],
    prevProject: PrevOrNextProject,
    nextProject: PrevOrNextProject
  }
}

function MoreProjects({ data }: MoreProjectsProps) {
  const { categories, prevProject, nextProject } = data
  console.log(data);

  return (
    <div className="mt-32 w-full flex flex-col 800:flex-row justify-between items-center gap-8 1100:gap-12">
      <ProjectPaginationCard project={prevProject} type={PREV} />
      <ProjectPaginationCard project={nextProject} type={NEXT} />
    </div>
  )
}

export default MoreProjects