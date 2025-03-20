import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import ImageWithFallback from "@/components/image-with-fallback";
import { FALLBACK_IMG, NEXT, PREV } from "@/lib/constants";
import { PrevOrNextProject } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProjectPaginationCardProps = {
  project: PrevOrNextProject;
  type: typeof PREV | typeof NEXT;
};

function ProjectPaginationCard({ project, type }: ProjectPaginationCardProps) {
  const isNext = type === NEXT;

  return (
    <Link
      className={cn(
        "w-full 800:max-w-1/2 h-full flex items-center overflow-hidden p-2 rounded-lg shadow-background border border-solid border-darkPrimary transition-all duration-300 ease-in-out bg-background hover:scale-[1.02] hover:shadow-lg",
        isNext ? "800:ml-auto" : "800:mr-auto"
      )}
      href={`/app/project/${project?.slug}`}
    >
      <div className="w-full p-2 max-550:flex flex-col-reverse 550:grid grid-cols-12 gap-8 550:gap-0 550:items-center">
        <ArrowLeft
          className={cn(
            "col-span-1 550:mx-auto max-550:w-10 h-auto",
            isNext ? "ml-auto rotate-180 550:order-3" : "mr-auto"
          )}
        />
        <div
          className={cn(
            "800:max-930:col-span-7 col-span-5 px-4 flex flex-col",
            isNext && "550:order-2"
          )}
        >
          <p>{isNext ? "Next project" : "Previous project"}</p>
          <h2 className="font-bold text-xl">{project?.title}</h2>
        </div>
        <ImageWithFallback
          className={cn(
            "800:max-930:col-span-4 col-span-6 w-full 800:max-930:h-[150px] h-[200px] object-cover",
            isNext && "550:order-first"
          )}
          src={project?.image}
          fallbackSrc={FALLBACK_IMG}
          alt={project?.title}
          width={0}
          height={0}
          sizes={"100%"}
          quality={50}
        />
      </div>
    </Link>
  );
}

export default ProjectPaginationCard;
