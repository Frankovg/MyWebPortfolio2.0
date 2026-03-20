"use client";

import dynamic from "next/dynamic";

import type { ICategoryWithProjectsAdmin } from "@/lib/types";

const PortfolioChart = dynamic(
  () =>
    import("./portfolio-chart").then((mod) => ({
      default: mod.PortfolioChart,
    })),
  { ssr: false }
);

function PortfolioChartLoader({
  categories,
}: {
  categories: ICategoryWithProjectsAdmin[];
}) {
  return <PortfolioChart categories={categories} />;
}

export default PortfolioChartLoader;
