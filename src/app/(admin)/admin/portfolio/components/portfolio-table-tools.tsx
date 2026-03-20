import { Table as TTable } from "@tanstack/react-table";

import { SearchInput } from "@/components/primitives/search-input";
import { Checkbox } from "@/components/ui/checkbox";

import AddProjectButton from "./add-project-button";

import type { Project } from "@/generated/prisma/client";


function PortfolioTableTools({ table }: { table: TTable<Project> }) {
  return (
    <div className="w-full flex justify-between md:max-lg:flex-col md:max-lg:gap-5 md:max-lg:items-end max-600:flex-col max-600:gap-5 max-600:items-end mt-10 pb-2 group">
      <SearchInput
        placeholder="Search project..."
        value={table.getState().globalFilter ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
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
