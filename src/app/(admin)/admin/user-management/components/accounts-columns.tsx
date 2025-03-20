import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import CheckboxCell from "@/components/checkbox-cell";

export const accountsColumns = (
  isAdmin: boolean,
  isPending: boolean,
  pendingRowId: string | null,
  handleCheckboxChange: (id: string, value: boolean) => Promise<void>
): ColumnDef<User>[] => [
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      const blurEmail = !isAdmin && row.original.isAdmin;
      const email = blurEmail ? "dontlook@behindyou.com" : row.original.email;
      return (
        <div
          className={`text-left font-light text-textWhite ${
            blurEmail && "blur-xs select-none"
          }`}
        >
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="text-left">Role</div>,
    cell: ({ row }) => {
      const role = row.original.isAdmin ? "Admin" : "Sample";
      return <div className="text-left font-light text-textWhite">{role}</div>;
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
];
