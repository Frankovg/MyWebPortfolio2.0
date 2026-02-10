"use client";

import clsx from "clsx";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  secondary?: boolean
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full 930:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx("flex justify-start pt-10 930:gap-10",
              item.secondary ? "930:pt-16" : "930:pt-40"
            )}
          >
            <div className="sticky flex flex-col 930:flex-row z-40 items-center top-40 self-start max-w-xs 930:w-full 930:max-w-xs" >
              <div className="size-5 930:size-10 absolute left-1 930:left-3 bg-darkPrimary rounded-full flex items-center justify-center">
                <div className={clsx("rounded-full p-1",
                  item.secondary ? "bg-secondary 930:p-1.5 930:size-2 opacity-75" : "bg-primary 930:p-2 930:size-4"
                )} />
              </div>
              <h3 className={clsx("hidden 930:block 930:pl-20 font-bold",
                item.secondary ? "930:text-3xl" : "930:text-5xl"
              )}>
                {item.title}
              </h3>
            </div>

            <div className="relative pl-10 w-full">
              <h3 className="930:hidden block text-md mb-4 text-left font-bold">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute 930:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-0.5 bg-linear-to-t from-secondary via-darkPrimary to-transparent from-0% via-10% rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
