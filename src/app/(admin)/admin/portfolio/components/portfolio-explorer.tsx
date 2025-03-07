import { Tabs } from "@/components/ui/tabs";
import PortfolioTabsList from "./portfolio-tabs-list";
import { ICategoryWithProjectsAdmin } from "../types/types";
import PortfolioContent from "./portfolio-content";

type PortfolioExplorerProps = {
  categories: ICategoryWithProjectsAdmin[];
  isAdmin?: boolean;
};

function PortfolioExplorer({
  categories,
  isAdmin = false,
}: PortfolioExplorerProps) {
  return (
    <div className="w-full border-b border-darkGrey">
      <Tabs defaultValue="web-development" className="w-fit">
        <PortfolioTabsList tabs={categories} />

        {categories.map((category) => (
          <PortfolioContent key={category.id} content={category} />
        ))}
      </Tabs>
    </div>
  );
}

export default PortfolioExplorer;
