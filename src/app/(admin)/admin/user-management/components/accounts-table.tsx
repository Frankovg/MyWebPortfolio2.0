"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState, useTransition } from "react";

import BodyTable from "@/components/table/body-table";
import HeaderTable from "@/components/table/header-table";
import WrapperTable from "@/components/table/wrapper-table";
import { Table } from "@/components/ui/table";
import { useUserManagementContext } from "@/hooks/use-user-management-context";

import { accountsColumns } from "./accounts-columns";

type AccountsTableProps = {
  isAdmin?: boolean;
};

function AccountsTable({ isAdmin = false }: AccountsTableProps) {
  const [isPending, startTransition] = useTransition();
  const [pendingRowId, setPendingRowId] = useState<string | null>(null);

  const { handleActiveAccount, users } = useUserManagementContext();

  const handleCheckboxChange = async (id: string, value: boolean) => {
    setPendingRowId(id);
    startTransition(async () => {
      await handleActiveAccount(id, value);
      setPendingRowId(null);
    });
  };

  const columns = accountsColumns(
    isAdmin,
    isPending,
    pendingRowId,
    handleCheckboxChange
  );
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <WrapperTable>
      <Table>
        <HeaderTable table={table} />
        <BodyTable table={table} />
      </Table>
    </WrapperTable>
  );
}

export default AccountsTable;
