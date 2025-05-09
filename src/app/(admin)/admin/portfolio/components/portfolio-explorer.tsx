"use client";

import { useProjectContext } from "@/hooks/use-project-context";

import PortfolioContent from "./portfolio-content";
import PortfolioTabsList from "./portfolio-tabs-list";
import PortfolioTabsWrapper from "./portfolio-tabs-wrapper";

type PortfolioExplorerProps = {
  isAdmin?: boolean;
  defaultCategory: string;
};

function PortfolioExplorer({
  isAdmin = false,
  defaultCategory,
}: PortfolioExplorerProps) {
  const { categories } = useProjectContext();
  return (
    <PortfolioTabsWrapper defaultCategory={defaultCategory}>
      <PortfolioTabsList tabs={categories} />
      {categories.map((category) => (
        <PortfolioContent key={category.id} content={category} />
      ))}
    </PortfolioTabsWrapper>
  );
}

export default PortfolioExplorer;
