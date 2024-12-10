'use client'

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: () => <div className="text-right">Email</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div className="text-right">Role</div>,
    cell: ({ row }) => {
      const role = row.original.isAdmin ? 'Admin' : 'Sample'
      return (
        <div className="text-right font-medium">{role}</div>
      )
    },
  },
  {
    accessorKey: "active",
    header: () => <div className="text-right">Active</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.original.isActive}</div>
    ),
  },
]