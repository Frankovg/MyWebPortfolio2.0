import { Category, Project, TechStack } from "@prisma/client"

interface IProjectWithTechStack extends Project {
  techStack: TechStack[]
}
interface ICategoryWithProjects extends Category {
  projects: IProjectWithTechStack[]
}

export type CategoriesProps = {
  categories: ICategoryWithProjects[]
}

export type ProjectCardProps = {
  project: IProjectWithTechStack
}