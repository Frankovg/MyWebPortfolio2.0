import { PlayIcon } from "lucide-react";
import Link from "next/link";

import ImageWithFallback from "@/components/primitives/image-with-fallback";
import { FALLBACK_IMG } from "@/lib/constants";

import { ProjectCardProps } from "../types/types";

function ProjectCard({ project }: ProjectCardProps) {
  const techStackString = project.techStack.map((tech) => tech.name).join(", ");
  //TODO: Continue working here
  return (
    <Link
      href={`/project/${project.slug}`}
      className="
        group w-full h-full flex flex-col justify-between overflow-hidden p-2 rounded-sm shadow-background 
        border border-solid border-darkPrimary transition-all duration-300 ease-in-out 
        hover:bg-background hover:scale-[1.005] hover:shadow-lg
      "
    >
      <div className="relative w-full min-h-62.5">
        <div className="hidden group-hover:flex absolute top-2 right-3 items-center gap-2">
          <PlayIcon />
        </div>
        <ImageWithFallback
          className="size-full object-cover"
          src={project.image}
          fallbackSrc={FALLBACK_IMG}
          alt={project.title}
          width={0}
          height={0}
          sizes={"100%"}
          quality={50}
        />
      </div>
      <div className="w-full h-full px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{project.title}</h2>
        <p
          className="opacity-50 text-base group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
          {project.shortDescription}
        </p>
      </div>
      <div className="w-90/100 mx-auto border-t border-solid border-darkPrimary text-center pt-2.5 pb-1">
        <p className="text-xs text-primary/80">{techStackString}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;
