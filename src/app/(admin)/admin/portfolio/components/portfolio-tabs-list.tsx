import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { ICategoryWithProjectsAdmin } from "../types/types";

function getFirstWord(text: string): string {
  return text.split(" ")[0];
}

function PortfolioTabsList({ tabs }: { tabs: ICategoryWithProjectsAdmin[] }) {
  return (
    <TabsList className="grid w-full grid-cols-3 p-0 items-end">
      {tabs.map((tab) => {
        return (
          <TabsTrigger
            key={tab.id}
            value={tab.value}
            className="w-full h-full py-1.5 px-3 data-[state=active]:bg-darkGrey font-normal hover:data-[state=inactive]:text-white border-r-2 border-darkPrimary"
          >
            <span className="hidden min-[400px]:block">{tab.name}</span>
            <span className="block min-[399px]:hidden">
              {getFirstWord(tab.name)}
            </span>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}

export default PortfolioTabsList;
