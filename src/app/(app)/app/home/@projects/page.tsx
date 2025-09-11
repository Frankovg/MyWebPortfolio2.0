import H3 from "@/components/primitives/h3";
import H4 from "@/components/primitives/h4";
import Section from "@/components/section";
import { getCategories } from "@/lib/server-utils-public";

import Categories from "./components/categories";

async function Projects() {
  const categories = await getCategories();

  if (!categories) throw new Error("Error fetching categories.",)

  return (
    <Section id="projects" className="pt-24">
      <H4>Projects</H4>
      <H3 className="max-w-600 pt-0">
        A short exploration of my present as a Front-end Developer and my past
        as a Designer.
      </H3>
      <Categories categories={categories} />
    </Section>
  );
}

export default Projects;
