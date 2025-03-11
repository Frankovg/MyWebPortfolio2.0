"use client";

import { useEffect, useState } from "react";

import { Tabs } from "@/components/ui/tabs";

import { CategoriesProps } from "../types/types";
import ProjectTabsList from "./project-tabs-list";
import ProjectContent from "./project-content";

function Categories({ categories }: CategoriesProps) {
  const [currentTab, setCurrentTab] = useState("web-development");
  const [nextTab, setNextTab] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setCurrentTab(nextTab!);
        setNextTab(null);
        setIsTransitioning(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextTab]);

  const handleTabChange = (value: string) => {
    setNextTab(value);
    setIsTransitioning(true);
  };

  return (
    <Tabs
      defaultValue="web-development"
      className="flex flex-col w-full items-center space-y-8"
      onValueChange={handleTabChange}
    >
      <ProjectTabsList tabs={categories} />

      {categories.map((category) => {
        const isCurrent = category.value === currentTab;
        const isNext = category.value === nextTab;
        return (
          <ProjectContent
            key={category.id}
            content={category}
            isCurrentTab={isCurrent}
            isNextTab={isNext}
          />
        );
      })}
    </Tabs>
  );
}

export default Categories;
