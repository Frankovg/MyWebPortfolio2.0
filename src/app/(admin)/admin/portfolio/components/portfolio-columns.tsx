"use client";

import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckIcon,
  PlayIcon,
  Settings,
  Trash2,
  TvMinimalPlay,
  XIcon,
} from "lucide-react";
import Link from "next/link";

import { GithubIcon } from "@/icons/social";
import { DATE_FORMAT, DATE_LOCATION } from "@/lib/constants";

//TODO: Sorting columns
// const dropdownLabels = { asc: "Asc", desc: "Desc" };

export const portfolioColumns = (
  handleOpenDeleteModal: (projectId: string, categoryId: string) => void
): ColumnDef<Project>[] => [
  {
    accessorKey: "title",
    header: () => <div className="text-left">Project name</div>,
    cell: ({ row }) => {
      return (
        <Link
          href={`/app/project/${row.original.slug}`}
          target="_blank"
          className="text-left font-light text-textWhite hover:text-white"
        >
          {row.getValue("title")}
        </Link>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "company",
    header: () => <div className="text-left">Company</div>,
    cell: ({ row }) => {
      const _company = row.getValue("company") as string;
      const company = _company ? _company : "-";
      return (
        <div className="text-left font-light text-textWhite">{company}</div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "client",
    header: () => <div className="text-left">Client</div>,
    cell: ({ row }) => {
      const _client = row.getValue("client") as string;
      const client = _client ? _client : "-";
      return (
        <div className="text-left font-light text-textWhite">{client}</div>
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
          {row.getValue("published") ? (
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
    accessorKey: "links",
    header: () => <div className="text-center">Links</div>,
    cell: ({ row }) => {
      const gitHub = row.original.repository;
      const website = row.original.websiteUrl;
      const video = row.original.videoUrl;
      return (
        <div className="flex justify-start items-center space-x-2 [&_svg]:h-4 [&_svg]:w-auto">
          {gitHub && (
            <Link href={gitHub} target="_blank">
              <GithubIcon className="fill-whiteText hover:fill-white transition-colors ease-in-out duration-200" />
            </Link>
          )}
          {website && (
            <Link href={website} target="_blank">
              <TvMinimalPlay className="hover:stroke-white transition-colors ease-in-out duration-200" />
            </Link>
          )}
          {video && (
            <Link href={video} target="_blank">
              <PlayIcon className="hover:stroke-white transition-colors ease-in-out duration-200" />
            </Link>
          )}
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
          href={`/admin/portfolio/edit/${row.original.id}`}
          aria-label={`Edit ${row.original.title}`}
          className="opacity-30 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white"
        >
          <Settings className="h-4 w-auto" />
        </Link>
      );
      const deleteButton = (
        <button
          aria-label={`Delete ${row.original.title}`}
          className="opacity-30 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white"
          onClick={() =>
            handleOpenDeleteModal(row.original.id, row.original.categoryId)
          }
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
