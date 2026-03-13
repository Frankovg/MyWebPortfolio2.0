'use client'

import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaVolumeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import dynamic from "next/dynamic";

import H3 from "@/components/primitives/h3";
import H4 from "@/components/primitives/h4";
import { Skeleton } from "@/components/ui/skeleton";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <Skeleton className="aspect-video size-full max-w-am bg-softGrey" />
  ),
});

type VideoData = {
  title: string;

  description: string;
  url: string;
};

type VideoComponentProps = {
  videoData?: VideoData;
};

function VideoComponent({ videoData }: VideoComponentProps) {
  return (
    <>
      <H4 className="mt-12">{videoData?.title}</H4>
      <H3 className="max-w-600 pt-0">{videoData?.description}</H3>
      <figure className="size-full flex justify-center">
        <MediaController
          aria-label={`Video player: ${videoData?.title || "Project video"}`}
          style={{
            width: "100%",
            maxWidth: "920px",
            aspectRatio: "16/9",
            marginBottom: "3rem",
          }}
        >
          <ReactPlayer
            slot="media"
            src={videoData?.url}
            style={{
              width: "100%",
              height: "100%",
            }}
            controls={false}
          />
          <MediaControlBar >
            <MediaPlayButton className="p-2" />
            <MediaTimeRange className="p-2" />
            <MediaMuteButton className="p-2" />
            <MediaVolumeRange className="p-2" />
            <MediaFullscreenButton className="p-2" />
          </MediaControlBar>
        </MediaController>
        <figcaption className="sr-only">
          {videoData?.title}: {videoData?.description}
        </figcaption>
      </figure>
    </>
  );
}

export default VideoComponent;
