"use client";

import { useProjectStore } from "@/stores/use-project-store";

import PortfolioContent from "./portfolio-content";
import PortfolioTabsList from "./portfolio-tabs-list";
import PortfolioTabsWrapper from "./portfolio-tabs-wrapper";

type PortfolioExplorerProps = {
  defaultCategory: string;
};

function PortfolioExplorer({
  defaultCategory,
}: PortfolioExplorerProps) {
  const categories = useProjectStore((state) => state.categories);

  if (!categories) throw new Error("Error fetching categories")

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
