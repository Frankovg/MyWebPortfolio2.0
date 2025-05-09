import { XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const ProjectFormRolesViewer = ({
  role,
  label,
  remove,
}: {
  role?: string;
  label?: string;
  remove: () => void;
}) => {
  if (!role) return null;
  return (
    <div className="aspect-video w-fit">
      <Badge
        onClick={(event) => {
          event.stopPropagation();
          remove();
        }}
        className="p-3 text-sm bg-darkPrimary cursor-pointer"
      >
        {label ?? ""}
        <XCircle className="ml-2 size-6 cursor-pointer" />
      </Badge>
    </div>
  );
};
