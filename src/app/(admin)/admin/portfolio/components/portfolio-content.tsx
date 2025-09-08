"use client";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useState } from "react";

import { TabsContent } from "@/components/ui/tabs";
import { useProjectContext } from "@/hooks/use-project-context";
import { ICategoryWithProjectsAdmin } from "@/lib/types";

import { portfolioColumns } from "./portfolio-columns";
import PortfolioTable from "./portfolio-table";
import PortfolioTableTools from "./portfolio-table-tools";

const DeleteModal = dynamic(
  () => import("../../../../../components/admin/delete-modal"),
  {
    ssr: false,
  }
);

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

  const { handleDeleteProject } = useProjectContext();

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

  const handleDelete = async () => {
    await handleDeleteProject(deleteModal.projectId, deleteModal.categoryId);
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
        title="Are you sure you want to delete this project?"
        subtitle="This action cannot be undone."
        deleteFile={handleDelete}
      />
    </>
  );
}

export default PortfolioContent;
