"use client";

import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";

export const portfolioColumns = (): ColumnDef<Project>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Project name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-light text-textWhite">
          {row.original.title}
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <div className="text-center">Published</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center font-textWhite">
          {row.original.published ? (
            <CheckIcon className="h-4 w-auto" />
          ) : (
            <XIcon className="h-4 w-auto" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "last_update",
    header: () => <div className="text-center">Last update</div>,
    cell: ({ row }) => {
      const newDate = new Date(row.original.updatedAt).toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      return (
        <div className="text-center font-light text-textWhite">{newDate}</div>
      );
    },
  },
  {
    accessorKey: "edit",
    header: () => <div className="text-center">Edit</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-light text-textWhite">edit icon</div>
      );
    },
  },
  {
    accessorKey: "delete",
    header: () => <div className="text-center">Delete</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-light text-textWhite">Delete icon</div>
      );
    },
  },
];
