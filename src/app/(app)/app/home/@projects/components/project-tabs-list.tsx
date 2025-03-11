import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategoryWithProjects } from "@/lib/types";

function ProjectTabsList({ tabs }: { tabs: ICategoryWithProjects[] }) {
  return (
    <TabsList className="w-full flex flex-col lg:flex-row justify-around lg:bg-background h-auto p-2 rounded-sm">
      {tabs.map((tab) => {
        return (
          <TabsTrigger
            key={tab.id}
            value={tab.value}
            className="w-full data-[state=active]:bg-darkGrey data-[state=active]:text-white data-[state=active]:font-bold rounded-sm"
            disabled={tab.projects.length === 0}
          >
            <h2 className="text-2xl px-4 transition-all duration-300 ease-in-out">
              {tab.name}
            </h2>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}

export default ProjectTabsList;
