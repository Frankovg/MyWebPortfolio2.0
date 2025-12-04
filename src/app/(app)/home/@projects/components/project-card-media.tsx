'use client'

import { ExternalLink, SquarePlayIcon } from "lucide-react"
import { useMemo } from "react"

import { GithubIcon } from "@/icons/social"
import { getYouTubeUrl } from "@/utils/getYouTubeUrl"

type ProjectCardMediaProps = {
  website?: string | null,
  repository?: string | null,
  video?: string | null
}

export const ProjectCardMedia = ({ website, repository, video }: ProjectCardMediaProps) => {

  const hasSome = website || repository || video
  const buttons = useMemo(() => (
    [
      {
        url: website,
        icon: <GithubIcon className="size-6 fill-current" />
      },
      {
        url: repository,
        icon: <ExternalLink className="size-6" />
      },
      {
        url: video,
        icon: <SquarePlayIcon className="size-6" />
      }
    ]
  ), [website, repository, video])

  if (hasSome) {
    return (
      <div className="hidden group-hover:flex absolute top-2 right-3 items-center gap-2 bg-background rounded-md p-1.5">
        {buttons.map((b) => {
          const url = b.url?.includes('youtube') ? getYouTubeUrl(b.url) : b.url

          if (url) {
            return (
              <button
                key={url}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  window.open(url ?? "", "_blank", "noopener,noreferrer")
                }}
                className="hover:text-white transition-colors duration-200"
              >
                {b.icon}
              </button>
            )
          }
        })}
      </div>
    )
  }

  return <></>
}
