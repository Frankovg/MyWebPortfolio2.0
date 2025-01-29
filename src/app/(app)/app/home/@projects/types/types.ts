import { Category, Project, Tech } from "@prisma/client"

interface IProjectWithTechStack extends Project {
  techStack: Tech[]
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