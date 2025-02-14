import { getCategories, getProjectBySlug } from "@/lib/server-utils"
import Section from "@/components/section"
import ProjectChart from "./components/project-chart"
import ProjectTechStack from "./components/project-tech-stack"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"
import VideoComponent from "./components/video-component"
import Loading from "./loading"
import ProjectBanner from "./components/project-banner"
import ProjectMainInfo from "./components/project-main-info"
import MoreProjects from "./components/more-projects"
import { parseCategories } from "./utils/parse-categories"

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

  const filteredCategories = categories?.filter((cat) => cat.id !== project?.categoryId)
  const parsedCategories = parseCategories(filteredCategories)
  const projectsInCategory = categories?.find((cat) => cat.id === project?.categoryId)?.projects || []
  const projectIndex = projectsInCategory?.findIndex((p) => p.id === project?.id)

  const firstProjectInTheList = projectsInCategory[0]
  const lastProjectInTheList = projectsInCategory[projectsInCategory.length - 1]

  const prevProject = projectIndex > 0 ? projectsInCategory[projectIndex - 1] : lastProjectInTheList
  const nextProject = projectIndex >= 0 && projectIndex < projectsInCategory.length - 1 ? projectsInCategory[projectIndex + 1] : firstProjectInTheList

  const moreProjects = {
    categories: parsedCategories,
    prevProject,
    nextProject,
  }

  const shortProjectInfo = {
    title: project.title,
    gallery: project.gallery,
    description: project.description,
    company: project.company,
    companyUrl: project.companyUrl,
    client: project.client,
    clientUrl: project.clientUrl,
    repository: project.repository,
    websiteUrl: project.websiteUrl,
  }

  return (
    <Suspense fallback={<Loading />}>
      <Section id={`project-slug:${project.slug}`}>
        <ProjectBanner image={project.image} />
        <ProjectMainInfo project={shortProjectInfo} />
        <Card className="my-12 600:mt-40 w-full bg-background">
          <CardContent className="w-full flex flex-col 930:flex-row items-top p-0">
            <ProjectChart roles={project.roles} />
            <ProjectTechStack techStack={project.techStack} />
          </CardContent>
        </Card>
        {hasVideo &&
          <VideoComponent videoData={videoData} />
        }
        <MoreProjects data={moreProjects} />
      </Section>
    </Suspense>
  )
}