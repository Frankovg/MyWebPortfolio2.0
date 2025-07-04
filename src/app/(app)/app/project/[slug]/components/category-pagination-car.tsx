import Link from "next/link";

import { ICategoryWithOneProject } from "@/lib/types";

type CategoryPaginationCardProps = {
  category: ICategoryWithOneProject;
};

function CategoryPaginationCard({ category }: CategoryPaginationCardProps) {
  const CategoryButton = (
    <div className="w-full p-2 flex flex-col gap-8 550:gap-0 550:items-center">
      <p>Explore the category</p>
      <h2 className="font-bold text-xl">{category?.name.toUpperCase()}</h2>
    </div>
  );

  if (!category.firstProjectSlug) {
    return (
      <div className="opacity-70 w-full 800:max-w-1/2 h-full flex items-center overflow-hidden p-2 rounded-lg shadow-background border border-solid border-darkPrimary bg-background">
        {CategoryButton}
      </div>
    );
  }

  return (
    <Link
      className="w-full 800:max-w-1/2 h-full flex items-center overflow-hidden p-2 rounded-lg shadow-background border border-solid border-darkPrimary transition-all duration-300 ease-in-out bg-background hover:scale-[1.005] hover:shadow-lg"
      href={`/app/project/${category?.firstProjectSlug}`}
    >
      {CategoryButton}
    </Link>
  );
}

export default CategoryPaginationCard;
