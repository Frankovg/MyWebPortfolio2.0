"use client";

import { GithubIcon } from "@/icons/social";
import { DATE_FORMAT, DATE_LOCATION } from "@/lib/constants";
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
    accessorKey: "company",
    header: () => <div className="text-left">Company</div>,
    cell: ({ row }) => {
      const _company = row.original.company;
      const company = _company ? _company : "-";
      return (
        <div className="text-left font-light text-textWhite">{company}</div>
      );
    },
  },
  {
    accessorKey: "client",
    header: () => <div className="text-left">Client</div>,
    cell: ({ row }) => {
      const _client = row.original.client;
      const client = _client ? _client : "-";
      return (
        <div className="text-left font-light text-textWhite">{client}</div>
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
    accessorKey: "created_at",
    header: () => <div className="text-center">Created</div>,
    cell: ({ row }) => {
      const newDateCreated = new Date(
        row.original.createdAt
      ).toLocaleDateString(DATE_LOCATION, DATE_FORMAT);
      return (
        <div className="text-center font-light text-textWhite">
          {newDateCreated}
        </div>
      );
    },
  },
  {
    accessorKey: "last_update",
    header: () => <div className="text-center">Last update</div>,
    cell: ({ row }) => {
      const newDateUpdated = new Date(
        row.original.updatedAt
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
    header: () => {},
    cell: ({ row }) => {
      const editButton = (
        <button
          aria-label={`Edit ${row.original.title}`}
          className="opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white"
          onClick={() => {}}
        >
          <Settings className="h-4 w-auto" />
        </button>
      );
      const deleteButton = (
        <button
          aria-label={`Delete ${row.original.title}`}
          className="opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white"
          onClick={() => {}}
        >
          <Trash2 className="h-4 w-auto" />
        </button>
      );
      return (
        <div className="flex justify-center items-center space-x-4">
          {editButton}
          {deleteButton}
        </div>
      );
    },
  },
];
