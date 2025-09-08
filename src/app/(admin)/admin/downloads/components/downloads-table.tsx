"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { useState } from "react";

import BodyTable from "@/components/table/body-table";
import HeaderTable from "@/components/table/header-table";
import WrapperTable from "@/components/table/wrapper-table";
import { Table } from "@/components/ui/table";
import { useUserDataContext } from "@/hooks/use-user-data-context";

import { downloadColumns } from "./download-columns";

const DeleteModal = dynamic(
  () => import("../../../../../components/admin/delete-modal"),
  {
    ssr: false,
  }
);

type AccountsTableProps = {
  isAdmin?: boolean;
};

const initialModalState = {
  isOpen: false,
  downloadId: "",
};

function DownloadsTable({ isAdmin = false }: AccountsTableProps) {
  const [deleteModal, setDeleteModal] = useState(initialModalState);

  const { downloads, handleDeleteFile } = useUserDataContext();

  const handleCloseDeleteModal = () => {
    setDeleteModal(initialModalState);
  };

  const handleOpenDeleteModal = (downloadId: string) => {
    setDeleteModal({
      isOpen: true,
      downloadId,
    });
  };

  const handleDeleteDownload = async () => {
    await handleDeleteFile(deleteModal.downloadId);
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
        title="Are you sure you want to delete this file?"
        subtitle="This action cannot be undone."
        deleteFile={handleDeleteDownload}
      />
    </>
  );
}

export default DownloadsTable;
