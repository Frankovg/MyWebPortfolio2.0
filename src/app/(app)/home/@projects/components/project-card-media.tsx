import { ExternalLink, SquarePlayIcon } from "lucide-react"

import { GithubIcon } from "@/icons/social"

type ProjectCardMediaProps = {
  website?: string | null,
  repository?: string | null,
  video?: string | null
}

export const ProjectCardMedia = ({ website, repository, video }: ProjectCardMediaProps) => {
  const hasSome = website || repository || video
  if (hasSome) {
    return (
      <div className="hidden group-hover:flex absolute top-2 right-3 items-center gap-2 bg-background rounded-md p-1.5">
        {repository &&
          <a
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:bg-primary"
          >
            <GithubIcon className="size-6 fill-current" />
          </a>
        }
        {website &&
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="size-6" />
          </a>
        }
        {video &&
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <SquarePlayIcon className="size-6" />
          </a>
        }
      </div>
    )
  }

  return <></>
}
