import { Tabs } from "@/components/ui/tabs";

import PortfolioContent from "./portfolio-content";
import PortfolioTabsList from "./portfolio-tabs-list";
import { ICategoryWithProjectsAdmin } from "@/lib/types";

type PortfolioExplorerProps = {
  categories: ICategoryWithProjectsAdmin[];
  isAdmin?: boolean;
};

function PortfolioExplorer({
  categories,
  isAdmin = false,
}: PortfolioExplorerProps) {
  return (
    <div className="w-full ">
      <Tabs defaultValue="web-development" className="w-full">
        <PortfolioTabsList tabs={categories} />
        {categories.map((category) => (
          <PortfolioContent key={category.id} content={category} />
        ))}
      </Tabs>
    </div>
  );
}

export default PortfolioExplorer;
