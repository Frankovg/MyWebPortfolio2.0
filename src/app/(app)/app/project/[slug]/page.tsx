import { notFound } from "next/navigation";
import { Suspense } from "react";

import Section from "@/components/section";
import { getCategories, getProjectBySlug } from "@/lib/server-utils-public";

import MoreProjects from "./components/more-projects";
import ProjectBanner from "./components/project-banner";
import ProjectChart from "./components/project-chart";
import ProjectMainInfo from "./components/project-main-info";
import ProjectTechStack from "./components/project-tech-stack";
import VideoComponent from "./components/video-component";
import Loading from "./loading";
import { parseCategories } from "./utils/parse-categories";

//TODO: add zod validations to every fetch

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, categories] = await Promise.all([
    getProjectBySlug(slug),
    getCategories(),
  ]);

  if (!project) notFound();

  const hasVideo = !!project.videoUrl;
  const videoData = hasVideo
    ? {
      title: project.videoTitle || "",
      description: project.videoDescription || "",
      url: project.videoUrl || "",
    }
    : undefined;

  const filteredCategories = categories?.filter(
    (cat) => cat.id !== project?.categoryId
  );
  const parsedCategories = parseCategories(filteredCategories);
  const projectsInCategory =
    categories?.find((cat) => cat.id === project?.categoryId)?.projects || [];
  const projectIndex = projectsInCategory?.findIndex(
    (p) => p.id === project?.id
  );

  const firstProjectInTheList = projectsInCategory[0];
  const lastProjectInTheList =
    projectsInCategory[projectsInCategory.length - 1];

  const prevProject =
    projectIndex > 0
      ? projectsInCategory[projectIndex - 1]
      : lastProjectInTheList;
  const nextProject =
    projectIndex >= 0 && projectIndex < projectsInCategory.length - 1
      ? projectsInCategory[projectIndex + 1]
      : firstProjectInTheList;

  const moreProjects = {
    categories: parsedCategories,
    prevProject,
    nextProject,
  };

  const shortProjectInfo = {
    title: project.title,
    gallery: project.gallery,
    description: project.description,
    date: project.date,
    company: project.company,
    companyUrl: project.companyUrl,
    client: project.client,
    clientUrl: project.clientUrl,
    repository: project.repository,
    websiteUrl: project.websiteUrl,
  };

  return (
    <Suspense fallback={<Loading />}>
      <Section id={`project-slug:${project.slug}`}>
        <ProjectBanner image={project.image} />
        <ProjectMainInfo project={shortProjectInfo} />
        <div className="600:my-16 w-full">
          <div className="w-full flex flex-col 930:flex-row items-top p-0">
            <ProjectChart roles={project.roles} />
            <ProjectTechStack techStack={project.techStack} />
          </div>
        </div>
        {hasVideo && <VideoComponent videoData={videoData} />}
        <MoreProjects data={moreProjects} />
      </Section>
    </Suspense>
  );
}
