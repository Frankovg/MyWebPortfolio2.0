'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUserManagementContext } from "@/hooks/use-user-management-context"
import { User } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react"

function AccountsTable() {
  const [isPending, startTransition] = useTransition()

  const { handleActiveAccount, users } = useUserManagementContext()

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }) => (
        <div className="text-left font-light text-white">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-left">Role</div>,
      cell: ({ row }) => {
        const role = row.original.isAdmin ? 'Admin' : 'Sample'
        return (
          <div className="text-left font-light text-white">{role}</div>
        )
      },
    },
    {
      accessorKey: "active",
      header: () => <div className="text-center">Active</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Checkbox
            checked={row.original.isActive}
            onCheckedChange={(value) => startTransition(() => handleActiveAccount(row.original.id, !!value))}
          />
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border border-whiteText">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AccountsTable