import { ICategoryWithProjects, IProjectWithTechStack } from "@/lib/types"

export type CategoriesProps = {
  categories: ICategoryWithProjects[]
}

export type ProjectCardProps = {
  project: IProjectWithTechStack
}