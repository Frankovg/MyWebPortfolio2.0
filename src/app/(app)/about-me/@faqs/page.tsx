import H3 from "@/components/primitives/h3";
import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import AcademicBackground from "./components/academic-background";
import CompanyClients from "./components/company-clients";
import FaqsAccordion from "./components/faqs-accordion";
import Hobbies from "./components/hobbies";
import Inspiration from "./components/inspiration";
import MyCv from "./components/my-cv";
import ToLinkedIn from "./components/to-linkedin";
import WorkedWith from "./components/worked-with";

async function Faqs() {
  const items = [
    {
      id: "item-1",
      trigger: "What companies have you worked for?",
      content: <WorkedWith />,
    },
    {
      id: "item-2",
      trigger:
        "Can you name some of the most important clients you've worked with?",
      content: <CompanyClients />,
    },
    {
      id: "item-3",
      trigger: "Tell me about your academic background",
      content: <AcademicBackground />,
    },
    {
      id: "item-4",
      trigger:
        "What inspired your move from product design to web apps development?",
      content: <Inspiration />,
    },
    {
      id: "item-5",
      trigger: "What do you like to do in your free time?",
      content: <Hobbies />,
    },
    {
      id: "item-6",
      trigger: "Where can I find a copy of your CV?",
      content: <MyCv />,
    },
    {
      id: "item-7",
      trigger: "Where can I find recommendations or references about you?",
      content: <ToLinkedIn />,
    },
  ];

  return (
    <Section id="projects" className="pt-24">
      <H4>FAQ&apos;s</H4>
      <H3 className="max-w-600 pt-0">
        If you&apos;re interested in reaching out, feel free to use the contact
        form located below to send me a message.
      </H3>
      <FaqsAccordion items={items} />
    </Section>
  );
}

export default Faqs;
