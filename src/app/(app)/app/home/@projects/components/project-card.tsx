import ImageWithFallback from "@/components/image-with-fallback";
import { FALLBACK_IMG } from "@/lib/constants";
import Link from "next/link";

type ProjectCardProps = {
  project: {
    image: string,
    title: string,
    shortDescription: string,
    techStack: string,
    slug: string,
  }
}

function ProjectCard({ project }: ProjectCardProps) {

  return (
    <Link
      href={`/app/project/${project.slug}`}
      className="w-full h-full flex flex-col justify-between overflow-hidden p-2 rounded shadow-lg shadow-background border border-solid border-darkPrimary transition-all duration-300 ease-in-out hover:bg-background hover:scale-[1.02]"
    >
      <div className="w-full">
        <ImageWithFallback
          className="w-full h-full object-cover min-h-[250px]"
          src={project.image}
          fallbackSrc={FALLBACK_IMG}
          alt={project.title}
          width={0}
          height={0}
          sizes={'100%'}
          quality={50}
        />
      </div>
      <div className="w-full h-full px-6 py-4">
        <div className="font-bold text-xl mb-2">{project.title}</div>
        <p className="text-gray-600 text-base">{project.shortDescription}</p>
      </div>
      <div className="w-[90%] mx-auto border-t border-solid border-darkPrimary text-center pt-2.5 pb-1">
        <p className="text-xs text-primary/80">{project.techStack}</p>
      </div>
    </Link>
  )
}

export default ProjectCard