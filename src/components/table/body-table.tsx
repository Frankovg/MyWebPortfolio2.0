import { Table } from "@tanstack/react-table";

import { TableBody } from "../ui/table";

import RowContentTable from "./row-content-table";

function BodyTable<T>({ table }: { table: Table<T> }) {
  const hasContent = !!table.getRowModel().rows?.length;

  if (!hasContent) {
    return (
      <TableBody>
        <RowContentTable colSpan={table.getAllColumns().length} />
      </TableBody>
    );
  }

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <RowContentTable key={row.id} row={row} />
      ))}
    </TableBody>
  );
}

export default BodyTable;
