import { getCategoriesForChart } from "@/lib/server-utils-public";
import { PortfolioChart } from "./portfolio-chart";

export async function Dashboard({ isAdmin = false }: { isAdmin?: boolean }) {
  const categories = await getCategoriesForChart();

  return (
    <>
      <PortfolioChart categories={categories} />
    </>
  );
}
