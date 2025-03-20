"use client";

import { Project } from "@prisma/client";
import { Table as TTable } from "@tanstack/react-table";

import BodyTable from "@/components/table/body-table";
import HeaderTable from "@/components/table/header-table";
import WrapperTable from "@/components/table/wrapper-table";
import { Table } from "@/components/ui/table";

function PortfolioTable({ table }: { table: TTable<Project> }) {
  return (
    <WrapperTable>
      <Table>
        <HeaderTable table={table} />
        <BodyTable table={table} />
      </Table>
    </WrapperTable>
  );
}

export default PortfolioTable;
