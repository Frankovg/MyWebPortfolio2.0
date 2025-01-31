'use client'

import H3 from "@/components/h3"
import H4 from "@/components/h4"

type VideoData = {
  title: string,
  description: string,
  url: string
}

type VideoComponentProps = {
  videoData?: VideoData
}

//TODO: Fix the error ReferenceError: browser is not defined 
function VideoComponent({ videoData }: VideoComponentProps) {
  return (
    <>
      <H4 className="mt-12">{videoData?.title}</H4>
      <H3 className="max-w-600 pt-0">
        {videoData?.description}
      </H3>
      <iframe
        className="mb-12 aspect-video w-full max-w-am"
        src={videoData?.url}
        title={videoData?.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </>
  )
}

export default VideoComponent