import H3 from "@/components/primitives/h3";
import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import TechViewer from "./components/tech-viewer";

function TechStack() {
  return (
    <Section id="tech-stack" className="pt-[15vh]">
      <H4>Tech Stack</H4>
      <H3 className="max-w-600 pt-0">
        These are the hottest technologies right now. I enjoy staying up-to-date
        and continuously expanding my knowledge and skills.
      </H3>
      <TechViewer />
    </Section>
  );
}

export default TechStack;
