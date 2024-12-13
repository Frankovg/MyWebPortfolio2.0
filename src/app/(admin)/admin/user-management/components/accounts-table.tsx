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
import { useState, useTransition } from "react"
import { Spinner } from "@/components/spinner"

type AccountsTableProps = {
  isAdmin?: boolean
}

type CheckboxCellProps = {
  loading: boolean
  disabled: boolean
  checked: boolean
  id: string
  handleCheckboxChange: (id: string, value: boolean) => Promise<void>
}

const CheckboxCell = ({
  loading,
  disabled,
  checked,
  id,
  handleCheckboxChange
}: CheckboxCellProps) => (
  <div className="flex justify-center items-center">
    {loading ? (
      <Spinner size="sm" className="text-white" />
    ) : (
      <Checkbox
        disabled={disabled}
        checked={checked}
        onCheckedChange={(value) => handleCheckboxChange(id, !!value)}
      />
    )}
  </div>
)


function AccountsTable({ isAdmin = false }: AccountsTableProps) {
  const [isPending, startTransition] = useTransition()
  const [pendingRowId, setPendingRowId] = useState<string | null>(null)

  const { handleActiveAccount, users } = useUserManagementContext()

  const handleCheckboxChange = async (id: string, value: boolean) => {
    setPendingRowId(id)
    startTransition(async () => {
      await handleActiveAccount(id, value)
      setPendingRowId(null)
    })
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }) => {
        const blurEmail = !isAdmin && row.original.isAdmin
        const email = blurEmail ? 'dontlook@behindyou.com' : row.original.email
        return (
          <div className={`text-left font-light text-white ${blurEmail && 'blur-sm select-none'}`}>
            {email}
          </div>
        )
      },
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
        <CheckboxCell
          loading={isPending && pendingRowId === row.original.id}
          disabled={row.original.isAdmin}
          checked={row.original.isActive}
          id={row.original.id}
          handleCheckboxChange={handleCheckboxChange}
        />
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