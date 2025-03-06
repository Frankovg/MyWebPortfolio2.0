import { Category, Project } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ICategoryWithProjectsAdmin extends Category {
  projects: Project[];
}

type PortfolioExplorerProps = {
  categories: ICategoryWithProjectsAdmin[];
};

function PortfolioExplorer({ categories }: PortfolioExplorerProps) {
  return (
    <Tabs defaultValue="web-development" className="w-fit">
      <TabsList className="grid w-full grid-cols-3">
        {categories.map((category) => {
          return (
            <TabsTrigger
              key={category.id}
              value={category.value}
              className="w-full data-[state=active]:bg-darkGrey rounded-sm font-normal"
            >
              {category.name}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}

export default PortfolioExplorer;
