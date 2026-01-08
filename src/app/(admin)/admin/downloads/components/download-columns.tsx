"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, Settings, Trash2, XIcon } from "lucide-react";
import Link from "next/link";

import { Download } from "@/generated/prisma/client";
import { DATE_FORMAT, DATE_LOCATION, LANGUAGE_DICTIONARY } from "@/lib/constants";

export const downloadColumns = (
  handleOpenDeleteModal: (downloadId: string) => void
): ColumnDef<Download>[] => [
    {
      accessorKey: "name",
      header: () => <div className="text-left">File name</div>,
      cell: ({ row }) => {
        return (
          <div className="text-start font-light text-textWhite">
            {row.getValue("name")}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "language",
      header: () => <div className="text-center">Language</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-light text-textWhite">
            {LANGUAGE_DICTIONARY[row.getValue("language") as keyof typeof LANGUAGE_DICTIONARY]}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "format",
      header: () => <div className="text-center">Format</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-light text-textWhite">
            {row.getValue("format")}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "published",
      header: () => <div className="text-center">Published</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center font-textWhite">
            {row.original.isActive ? (
              <CheckIcon className="h-4 w-auto" />
            ) : (
              <XIcon className="h-4 w-auto" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-center">Created</div>,
      cell: ({ row }) => {
        const newDateCreated = new Date(
          row.getValue("createdAt")
        ).toLocaleDateString(DATE_LOCATION, DATE_FORMAT);
        return (
          <div className="text-center font-light text-textWhite">
            {newDateCreated}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: () => <div className="text-center">Last update</div>,
      cell: ({ row }) => {
        const newDateUpdated = new Date(
          row.getValue("updatedAt")
        ).toLocaleDateString(DATE_LOCATION, DATE_FORMAT);
        return (
          <div className="text-center font-light text-textWhite">
            {newDateUpdated}
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const editLink = (
          <Link
            href={`/admin/downloads/edit/${row.original.id}`}
            aria-label={`Edit ${row.original.name}`}
            className="opacity-30 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white"
          >
            <Settings className="h-4 w-auto" />
          </Link>
        );
        const deleteButton = (
          <button
            aria-label={`Delete ${row.original.name}`}
            className="opacity-30 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white"
            onClick={() => handleOpenDeleteModal(row.original.id)}
          >
            <Trash2 className="h-4 w-auto" />
          </button>
        );
        return (
          <div className="flex justify-center items-center space-x-4">
            {editLink}
            {deleteButton}
          </div>
        );
      },
    },
  ];
