"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import TechCard from "@/components/tech-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { CATEGORIES } from "../utils/client-constants";

function DesktopTechViewer() {
  const [activeTab, setActiveTab] = useState("basics");

  const activeCategory = CATEGORIES.find((cat) => cat.value === activeTab);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      orientation="vertical"
      className="max-sm:hidden w-full flex items-start"
    >
      <div className="w-1/2 930:w-3/5 px-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-3 sm:max-799:grid-cols-2 800:max-929:grid-cols-3 930:grid-cols-4 grid-rows-3 gap-8"
          >
            {activeCategory?.techs.map((tech) => (
              <TechCard
                key={tech.value}
                tech={tech}
                className="inline-block h-28 max-h-28 w-auto object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-[1.02]"
              />
            ))}
          </motion.div>
        </AnimatePresence>
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
            className={cn(
              "justify-start rounded-none pt-3 pb-2 pl-1 border-b border-solid font-normal transition-all duration-500 ease-in-out text-lg hover:bg-darkGrey data-[state=active]:bg-darkGrey data-[state=active]:text-xl data-[state=active]:text-white data-[state=active]:shadow-none",
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
