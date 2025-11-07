'use client'

import { AccordionItem } from "@radix-ui/react-accordion"
import { JSX, useRef } from "react";

import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"

type Item = {
  id: string;
  trigger: string;
  content: JSX.Element;
}

type FaqsAccordionProps = {
  items: Item[]
}

function FaqsAccordion({ items }: FaqsAccordionProps) {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleValueChange = (value: string[]) => {
    const lastOpenedItem = value[value.length - 1];
    if (lastOpenedItem && itemRefs.current[lastOpenedItem]) {
      setTimeout(() => {
        itemRefs.current[lastOpenedItem]?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    }
  };

  return (
    <Accordion
      type="multiple"
      onValueChange={handleValueChange}
      className="w-full divide-y text-base lg:text-lg transition-all duration-300 ease-in-out"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          ref={(el) => {
            itemRefs.current[item.id] = el;
          }}
        >
          <AccordionTrigger
            className="hover:text-[1.15rem] hover:no-underline data-[state=open]:text-xl data-[state=open]:text-primary w-full text-left"
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqsAccordion
