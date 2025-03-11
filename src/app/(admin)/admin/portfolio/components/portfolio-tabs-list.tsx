import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { ICategoryWithProjectsAdmin } from "../types/types";

function PortfolioTabsList({ tabs }: { tabs: ICategoryWithProjectsAdmin[] }) {
  return (
    <TabsList className="grid w-full grid-cols-3 p-0 items-end">
      {tabs.map((tab) => {
        return (
          <TabsTrigger
            key={tab.id}
            value={tab.value}
            className="w-full py-1.5 px-3 data-[state=active]:bg-darkGrey font-normal hover:data-[state=inactive]:text-white border-r-2 border-darkPrimary"
          >
            {tab.name}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}

export default PortfolioTabsList;
