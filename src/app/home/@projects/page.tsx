//Components
import H4 from "@/components/h4"
import H3 from "@/components/h3"
import Section from "@/components/section"
import Categories from "./components/categories"

//Utils
import { getCategories } from "@/lib/server-utils"

async function Projects() {
  const categories = await getCategories()

  return (
    <Section id="tech-stack">
      <H4>Projects</H4>
      <H3>
        A short exploration of my present as a Front-end Developer and my past as a Designer.
      </H3>
      <Categories categories={categories} />
    </Section>
  )
}

export default Projects