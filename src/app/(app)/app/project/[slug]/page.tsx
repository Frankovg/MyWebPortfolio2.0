import { getProjectBySlug } from "@/lib/server-utils"
import Section from "@/components/section"
import BannerContainer from "@/components/banner-container"
import ImageWithFallback from "@/components/image-with-fallback"
import { FALLBACK_IMG } from "@/lib/constants"
import ProjectCarousel from "./components/project-carousel"
import H4 from "@/components/h4"
import ProjectInfo from "./components/project-info"
import ProjectChart from "./components/project-chart"
import ProjectTechStack from "./components/project-tech-stack"

export default async function ProjectPage({
  params
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const project = await getProjectBySlug(slug)
  if (!project) throw new Error('Project not found')

  return (
    <Section id={`project-slug:${project.slug}`}>
      <BannerContainer>
        <ImageWithFallback
          className='object-cover md:object-contain w-auto md:w-full h-full md:h-auto'
          src={project.image}
          fallbackSrc={FALLBACK_IMG}
          alt='Project banner'
          width={0}
          height={0}
          sizes={'100%'}
          quality={50}
        />
      </BannerContainer>

      <H4>{project.title}</H4>
      <div className="grid grid-cols-12 grid-flow-row gap-0">
        <div className="col-span-7">
          <ProjectCarousel images={project.gallery} />
        </div>
        <div className="col-start-8 col-span-5 pl-8">
          <ProjectInfo project={project} />
        </div>
      </div>
      <div className="mt-40 w-full flex items-top">
        <ProjectChart />
        {/* <ProjectTechStack stack={project.techStack} /> */}
      </div>

    </Section>
  )
}