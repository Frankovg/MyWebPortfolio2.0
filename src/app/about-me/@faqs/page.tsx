//Components
import H4 from "@/components/h4"
import H3 from "@/components/h3"
import Section from "@/components/section"
import FaqsAccordion from "./components/faqs-accordion"
import WorkedWith from "./components/worked-with"

async function Faqs() {
  const items = [
    {
      id: 'item-1',
      trigger: "Companies I've collaborated with",
      content: <WorkedWith />
    },
    {
      id: 'item-2',
      trigger: "Clients I've collaborated with",
      content: <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
    },
    {
      id: 'item-3',
      trigger: "About my degrees and education",
      content: <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
    },
    {
      id: 'item-4',
      trigger: "Why did I make the move to software development?",
      content: <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
    },
    {
      id: 'item-5',
      trigger: "My hobbies and activities",
      content: <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
    },
    {
      id: 'item-6',
      trigger: "My Curriculum Vitae",
      content: <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
    },
    {
      id: 'item-7',
      trigger: "LinkedIn recommendations",
      content: <span>Yes. It adheres to the WAI-ARIA design pattern.</span>
    }
  ]

  return (
    <Section id="projects" className="pt-24">
      <H4>FAQ&apos;s</H4>
      <H3 className="max-w-[600px] pt-0">
        If you&apos;re interested in reaching out, feel free to use the contact form located below to send me a message.
      </H3>
      <FaqsAccordion items={items} />
    </Section>
  )
}

export default Faqs