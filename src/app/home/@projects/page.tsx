'use client'

import H4 from "@/components/h4"
import Section from "@/components/section"
import { useProjectContext } from "@/hooks/useProjectContext"

function Projects() {

  //Test
  const { projects } = useProjectContext()
  console.log(projects);

  return (
    <Section id="tech-stack">
      <H4>Projects</H4>
    </Section>
  )
}

export default Projects