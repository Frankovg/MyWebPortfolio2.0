'use client'

import clsx from "clsx"
import Image, { ImageProps } from "next/image"
import { useRef, useState } from "react"

interface ImageWithFallbackProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc: string
  onLoad?: () => void
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, className, onLoad, ...rest } = props

  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  // Reset state during render when src changes (avoids extra re-render from useEffect)
  const prevSrc = useRef(src)
  if (prevSrc.current !== src) {
    prevSrc.current = src
    setImgSrc(src)
    setIsLoading(true)
  }

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      className={clsx("transition-all duration-300",
        isLoading && "bg-softGrey animate-pulse",
        imgSrc === fallbackSrc && "object-cover!",
        className,
      )}
      onLoad={handleLoad}
      onError={() => {
        setImgSrc(fallbackSrc);
        setIsLoading(false);
      }}
    />
  )
}

export default ImageWithFallback
