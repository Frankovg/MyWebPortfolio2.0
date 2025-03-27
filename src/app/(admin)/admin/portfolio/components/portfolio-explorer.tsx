"use client";

import { ICategoryWithProjectsAdmin } from "@/lib/types";

import PortfolioContent from "./portfolio-content";
import PortfolioTabsList from "./portfolio-tabs-list";
import PortfolioTabsWrapper from "./portfolio-tabs-wrapper";

type PortfolioExplorerProps = {
  categories: ICategoryWithProjectsAdmin[];
  isAdmin?: boolean;
  defaultCategory: string;
};

function PortfolioExplorer({
  categories,
  isAdmin = false,
  defaultCategory,
}: PortfolioExplorerProps) {
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
