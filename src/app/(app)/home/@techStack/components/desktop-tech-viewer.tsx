"use client";

import { useEffect, useState } from "react";

import TechCard from "@/components/tech-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { CATEGORIES } from "../utils/client-constants";

function DesktopTechViewer() {
  const [activeTab, setActiveTab] = useState("basics");
  const [displayedTab, setDisplayedTab] = useState("basics");
  const [transitionClass, setTransitionClass] = useState(
    "opacity-100 translate-y-0"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const displayedCategory = CATEGORIES.find(
    (cat) => cat.value === displayedTab
  );

  useEffect(() => {
    if (isTransitioning) {
      // Fade out + move down
      setTransitionClass("opacity-0 translate-y-2");

      const timer = setTimeout(() => {
        // Fade in + move up
        setTransitionClass("opacity-100 translate-y-0");
        setIsTransitioning(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleTabChange = (value: string) => {
    if (value !== activeTab && !isTransitioning) {
      setActiveTab(value);
      setIsTransitioning(true);

      // Change content halfway through animation
      setTimeout(() => {
        setDisplayedTab(value);
      }, 400);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      orientation="vertical"
      className="max-sm:hidden w-full flex items-start"
    >
      <div
        role="tabpanel"
        aria-labelledby={`tab-${displayedTab}`}
        className={cn("transition-all duration-500 ease-in-out w-1/2 930:w-3/5 px-12 grid grid-cols-3 sm:max-799:grid-cols-2 800:max-929:grid-cols-3 930:grid-cols-4 grid-rows-3 gap-8",
          transitionClass
        )}
      >
        {displayedCategory?.techs.map((tech) => (
          <TechCard
            key={tech.value}
            tech={tech}
            className="inline-block h-28 max-h-28 w-auto object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-[1.02]"
          />
        ))}
      </div>

      <TabsList
        className="w-1/2 930:w-2/5 h-auto flex flex-col items-stretch bg-transparent"
        aria-label="Tech stack categories"
      >
        {CATEGORIES.map((cat, index) => (
          <TabsTrigger
            key={cat.value}
            id={`tab-${cat.value}`}
            value={cat.value}
            className={cn("justify-start rounded-none pt-3 pb-2 pl-1 border-b border-solid font-normal transition-all duration-500 ease-in-out text-lg hover:bg-darkGrey data-[state=active]:bg-darkGrey data-[state=active]:text-xl data-[state=active]:text-white data-[state=active]:shadow-none",
              index !== 0 && "mt-3"
            )}
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default DesktopTechViewer;
