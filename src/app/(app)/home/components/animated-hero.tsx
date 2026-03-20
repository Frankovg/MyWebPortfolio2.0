'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function AnimatedHero() {
  const shouldReduceMotion = useReducedMotion();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Full-Stack Developer",
      "UX/UI Designer",
      "Industrial Designer",
      "Web App Developer",
    ], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(prev => prev === titles.length - 1 ? 0 : prev + 1);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <LazyMotion features={domAnimation}>
    <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
      &nbsp;
      {titles.map((title, index) => (
        <m.span
          key={title + index}
          className="absolute font-semibold"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -100 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 50 }}
          animate={
            titleNumber === index
              ? {
                y: 0,
                opacity: 1,
              }
              : {
                y: shouldReduceMotion ? 0 : (titleNumber > index ? -150 : 150),
                opacity: 0,
              }
          }
        >
          {title}
        </m.span>
      ))}
    </span>
    </LazyMotion>
  );
}

export { AnimatedHero };
