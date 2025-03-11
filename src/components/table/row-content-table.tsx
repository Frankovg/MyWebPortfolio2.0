import { flexRender, Row } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";

function RowContentTable<T>({
  row,
  colSpan,
}: {
  row?: Row<T>;
  colSpan?: number;
}) {
  if (!row) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan ?? 0} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="hover:bg-black"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default RowContentTable;
