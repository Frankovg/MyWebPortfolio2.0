'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<User>[] = [
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
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
  },
]