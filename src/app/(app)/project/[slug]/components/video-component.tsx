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
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'

import H3 from "@/components/primitives/h3";
import H4 from "@/components/primitives/h4";
import { Skeleton } from "@/components/ui/skeleton";

type VideoData = {
  title: string;

  description: string;
  url: string;
};

type VideoComponentProps = {
  videoData?: VideoData;
};

function VideoComponent({ videoData }: VideoComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <H4 className="mt-12">{videoData?.title}</H4>
      <H3 className="max-w-600 pt-0">{videoData?.description}</H3>
      <MediaController
        style={{
          width: "100%",
          maxWidth: "920px",
          aspectRatio: "16/9",
          marginBottom: "3rem",
        }}
      >
        {isMounted ? (
          <ReactPlayer
            slot="media"
            src={videoData?.url}
            style={{
              width: "100%",
              height: "100%",
            }}
            controls={false}
          />
        ) : (
          <Skeleton className="aspect-video size-full max-w-am bg-softGrey" />
        )}
        <MediaControlBar >
          <MediaPlayButton className="p-2" />
          <MediaTimeRange className="p-2" />
          <MediaMuteButton className="p-2" />
          <MediaVolumeRange className="p-2" />
          <MediaFullscreenButton className="p-2" />
        </MediaControlBar>
      </MediaController>
    </>
  );
}

export default VideoComponent;
