import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Project } from "@prisma/client";
import { Table as TTable } from "@tanstack/react-table";

function PortfolioTableTools({ table }: { table: TTable<Project> }) {
  return (
    <div className="w-full flex justify-between mt-10 pb-2">
      <Input
        placeholder="Search project..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="h-full w-1/3 border-whiteText placeholder:text-whiteText placeholder:font-normal"
      />
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" className="border-whiteText" />
        <label htmlFor="terms2" className="font-normal">
          Only published projects
        </label>
      </div>
      <Button
        className="font-normal border border-whiteText hover:bg-black"
        variant="outline"
        size="default"
      >
        + Add new project
      </Button>
    </div>
  );
}

export default PortfolioTableTools;
