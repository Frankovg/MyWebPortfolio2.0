import { NEXT, PREV } from "@/lib/constants";
import { ICategoryWithOneProject, PrevOrNextProject } from "@/lib/types";

import CategoryPaginationCard from "./category-pagination-car";
import ProjectPaginationCard from "./project-pagination-card";

type MoreProjectsProps = {
  data: {
    categories: ICategoryWithOneProject[];
    prevProject: PrevOrNextProject;
    nextProject: PrevOrNextProject;
  };
};

function MoreProjects({ data }: MoreProjectsProps) {
  const { categories, prevProject, nextProject } = data;

  return (
    <>
      <div className="mt-32 w-full flex flex-col 800:flex-row justify-between items-center gap-8 1100:gap-12">
        <ProjectPaginationCard project={prevProject} type={PREV} />
        <ProjectPaginationCard project={nextProject} type={NEXT} />
      </div>
      <div className="my-16 w-full flex flex-col 800:flex-row justify-between items-center gap-8 1100:gap-12">
        {categories.map((category) => (
          <CategoryPaginationCard category={category} key={category.id} />
        ))}
      </div>
    </>
  );
}

export default MoreProjects;
