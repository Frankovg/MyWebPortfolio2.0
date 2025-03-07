"use client";

import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const portfolioColumns = (): ColumnDef<Project>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Project name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-light text-white">
          {row.original.title}
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <div className="text-left">Published</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-light text-white">
          {row.original.published}
        </div>
      );
    },
  },
  {
    accessorKey: "last_update",
    header: () => <div className="text-center">Last update</div>,
    cell: ({ row }) => {
      //TODO: check how it works
      const newDate = new Date(row.original.updatedAt).toLocaleDateString();
      return <div className="text-left font-light text-white">{"newDate"}</div>;
    },
  },
  {
    accessorKey: "edit",
    header: () => <div className="text-center">Edit</div>,
    cell: ({ row }) => {
      return <div className="text-left font-light text-white">edit icon</div>;
    },
  },
  {
    accessorKey: "delete",
    header: () => <div className="text-center">Delete</div>,
    cell: ({ row }) => {
      return <div className="text-left font-light text-white">Delete icon</div>;
    },
  },
];
