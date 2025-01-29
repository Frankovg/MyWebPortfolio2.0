'use client'

function VideoComponent() {
  return (
    <iframe
      className="my-12 600:mt-40 aspect-video w-full max-w-am"
      src="https://www.youtube.com/embed/ROJoLYIi0ZA?si=WJLVWg0SmaQMbOsm"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      loading="lazy"
    />
  )
}

export default VideoComponent