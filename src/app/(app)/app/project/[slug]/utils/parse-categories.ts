import { ICategoryWithProjects } from "@/lib/types";

export const parseCategories = (categories: ICategoryWithProjects[]) => {
  return categories.length > 0
    ? categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      value: cat.value,
      firstProjectSlug: cat.projects?.[0]?.slug,
    }))
    : []
}
