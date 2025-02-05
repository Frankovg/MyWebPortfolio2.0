import { getCategories, getProjectBySlug } from "@/lib/server-utils"
import Section from "@/components/section"
import BannerContainer from "@/components/banner-container"
import ImageWithFallback from "@/components/image-with-fallback"
import { FALLBACK_IMG } from "@/lib/constants"
import ProjectCarousel from "./components/project-carousel"
import H4 from "@/components/h4"
import ProjectInfo from "./components/project-info"
import ProjectChart from "./components/project-chart"
import ProjectTechStack from "./components/project-tech-stack"
import { Card, CardContent } from "@/components/ui/card"
import MobileProjectImagesContainer from "./components/mobile-project-images-container"
import { Suspense } from "react"
import VideoComponent from "./components/video-component"
import Loading from "./loading"

export default async function ProjectPage({
  params
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [project, categories] = await Promise.all([
    getProjectBySlug(slug),
    getCategories()
  ])

  if (!project) throw new Error('Project not found')

  const hasVideo = !!project.videoUrl
  const videoData = hasVideo ?
    {
      title: project.videoTitle || '',
      description: project.videoDescription || '',
      url: project.videoUrl || ''
    } : undefined

  const parsedCategories = categories?.filter((cat) => cat.id !== project?.categoryId)
  const projectsInCategory = categories?.find((cat) => cat.id === project?.categoryId)?.projects || []
  const projectIndex = projectsInCategory?.findIndex((p) => p.id === project?.id)

  const prevProject = projectIndex > 0 ? projectsInCategory[projectIndex - 1] : null
  const nextProject = projectIndex >= 0 && projectIndex < projectsInCategory.length - 1 ? projectsInCategory[projectIndex + 1] : null

  const moreProjects = {
    categories: parsedCategories,
    prevProject,
    nextProject
  }

  return (
    <Suspense fallback={<Loading />}>
      <Section id={`project-slug:${project.slug}`}>
          //TODO: Move this component to a separate component with just the necessary data
        <BannerContainer className='max-600:hidden'>
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


        //TODO: Move this component to a separate component with just the necessary data
        <>
          <H4 className="600:pt-24">{project.title}</H4>
          <div className="grid grid-cols-12 grid-flow-row gap-0 mb-12">
            <div className="max-600:hidden 1100:col-span-7 col-span-12">
              <ProjectCarousel images={project.gallery} />
            </div>
            <div className="1100:col-start-8 1100:col-span-5 1100:pl-8 col-span-12 600:max-1100:pt-24">
              <ProjectInfo project={project} />
            </div>
            <div className="600:hidden 1100:col-span-7 col-span-12 pt-24">
              <MobileProjectImagesContainer images={project.gallery} />
            </div>
          </div>
        </>

        <Card className="my-12 600:mt-40 w-full bg-background">
          <CardContent className="w-full flex flex-col 930:flex-row items-top p-0">
            <ProjectChart roles={project.roles} />
            <ProjectTechStack techStack={project.techStack} />
          </CardContent>
        </Card>

        {hasVideo &&
          <VideoComponent videoData={videoData} />
        }


      </Section>
    </Suspense>
  )
}