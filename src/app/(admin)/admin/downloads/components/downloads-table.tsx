"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import BodyTable from "@/components/table/body-table";
import HeaderTable from "@/components/table/header-table";
import WrapperTable from "@/components/table/wrapper-table";
import { Table } from "@/components/ui/table";
import { downloadColumns } from "./download-columns";
import { useUserDataContext } from "@/hooks/use-user-data-context";
import dynamic from "next/dynamic";

const DeleteModal = dynamic(() => import("./delete-modal"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type AccountsTableProps = {
  isAdmin?: boolean;
};

const initialModalState = {
  isOpen: false,
  downloadId: "",
};

function DownloadsTable({ isAdmin = false }: AccountsTableProps) {
  const [deleteModal, setDeleteModal] = useState(initialModalState);

  const { downloads } = useUserDataContext();

  const handleOpenDeleteModal = (downloadId: string) => {
    setDeleteModal({
      isOpen: true,
      downloadId,
    });
  };

  const columns = downloadColumns(handleOpenDeleteModal);

  const table = useReactTable({
    data: downloads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <WrapperTable>
        <Table>
          <HeaderTable table={table} />
          <BodyTable table={table} />
        </Table>
      </WrapperTable>
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

export default DownloadsTable;
