import H4 from "@/components/h4"
import Section from "@/components/section"
import { getProjects } from "@/lib/server-utils"
import ProjectCard from "./components/project-card"

async function Projects() {
  const projects = await getProjects()

  return (
    <Section id="tech-stack">
      <H4>Projects</H4>
      <section>
        {projects.map((project) => {
          const parsedProject = {
            image: project.image,
            title: project.title,
            description: project.shortDescription,
          }
          return <ProjectCard key={project.id} project={parsedProject} />
        })}
      </section>
    </Section>
  )
}

export default Projects