"use client";

import { TabsContent } from "@/components/ui/tabs";
import { ICategoryWithProjectsAdmin } from "../types/types";
import PortfolioTable from "./portfolio-table";
import { portfolioColumns } from "./portfolio-columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

type PortfolioContentProps = {
  content: ICategoryWithProjectsAdmin;
};

function PortfolioContent({ content }: PortfolioContentProps) {
  const columns = portfolioColumns();
  const table = useReactTable({
    data: content.projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TabsContent
      value={content.value}
      className={`m-0 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4 transition-all duration-300 ease-out `}
    >
      <PortfolioTable table={table} />
    </TabsContent>
  );
}

export default PortfolioContent;
