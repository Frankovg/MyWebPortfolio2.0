import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { AccordionItem } from "@radix-ui/react-accordion"

type Item = {
  id: string;
  trigger: string;
  content: JSX.Element;
}

type FaqsAccordionProps = {
  items: Item[]
}

function FaqsAccordion({ items }: FaqsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full divide-y-[1px] text-base lg:text-lg transition-all duration-300 ease-in-out">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="hover:text-[1.15rem] hover:no-underline data-[state=open]:text-xl data-[state=open]:text-primary w-full" >
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