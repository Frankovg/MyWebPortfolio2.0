import { Project } from "@prisma/client";
import { Table as TTable } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import AddProjectButton from "./add-project-button";

function PortfolioTableTools({ table }: { table: TTable<Project> }) {
  return (
    <div className="w-full flex justify-between mt-10 pb-2 group">
      <Input
        placeholder="Search project..."
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="h-full w-1/3 border-whiteText placeholder:text-whiteText placeholder:font-normal hover-table-buttons"
      />

      <div className="flex items-center space-x-2 group">
        <Checkbox
          id="filter-check"
          className="border-whiteText group-hover:border-white transition-colors ease-in-out duration-200"
          onCheckedChange={(checked) =>
            table
              .getColumn("published")
              ?.setFilterValue(checked ? true : undefined)
          }
        />
        <label
          htmlFor="filter-check"
          className="font-normal hover:cursor-pointer"
        >
          Only published projects
        </label>
      </div>

      <AddProjectButton />
    </div>
  );
}

export default PortfolioTableTools;
