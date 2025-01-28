'use client'

function VideoComponent() {
  return (
    <div className="my-12 600:mt-40 flex justify-center aspect-w-16 aspect-h-9">
      <iframe
        className="w-full h-auto max-w-[640px] max-h-[360px]"
        src="https://www.youtube.com/embed/ROJoLYIi0ZA?si=WJLVWg0SmaQMbOsm"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

export default VideoComponent