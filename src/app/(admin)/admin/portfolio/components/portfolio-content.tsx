"use client";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { TabsContent } from "@/components/ui/tabs";
import { ICategoryWithProjectsAdmin } from "@/lib/types";

import { portfolioColumns } from "./portfolio-columns";
import PortfolioTable from "./portfolio-table";
import PortfolioTableTools from "./portfolio-table-tools";

type PortfolioContentProps = {
  content: ICategoryWithProjectsAdmin;
};

function PortfolioContent({ content }: PortfolioContentProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = portfolioColumns();

  const table = useReactTable({
    data: content.projects,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    enableColumnFilters: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TabsContent value={content.value}>
      <PortfolioTableTools table={table} />
      <PortfolioTable table={table} />
    </TabsContent>
  );
}

export default PortfolioContent;
