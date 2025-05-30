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
import dynamic from "next/dynamic";

const DeleteModal = dynamic(() => import("./delete-modal"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type PortfolioContentProps = {
  content: ICategoryWithProjectsAdmin;
};

const initialModalState = {
  isOpen: false,
  projectId: "",
  categoryId: "",
};

function PortfolioContent({ content }: PortfolioContentProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState(initialModalState);

  const handleOpenDeleteModal = (projectId: string, categoryId: string) => {
    setDeleteModal({
      isOpen: true,
      projectId,
      categoryId,
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(initialModalState);
  };

  const columns = portfolioColumns(handleOpenDeleteModal);

  const table = useReactTable({
    data: content.projects,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    enableColumnFilters: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _, filterValue) => {
      const searchValue = String(filterValue).toLowerCase();
      const title = String(row.getValue("title") || "").toLowerCase();
      const company = String(row.getValue("company") || "").toLowerCase();
      const client = String(row.getValue("client") || "").toLowerCase();
      return (
        title.includes(searchValue) ||
        company.includes(searchValue) ||
        client.includes(searchValue)
      );
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <TabsContent value={content.value}>
        <PortfolioTableTools table={table} />
        <PortfolioTable table={table} />
      </TabsContent>
      <DeleteModal
        close={handleCloseDeleteModal}
        isOpen={deleteModal.isOpen}
        data={{
          projectId: deleteModal.projectId,
          categoryId: deleteModal.categoryId,
        }}
      />
    </>
  );
}

export default PortfolioContent;
