'use client'

import clsx from "clsx"
import Image, { ImageProps } from "next/image"
import { useEffect, useState } from "react"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, className, ...rest } = props

  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
  }, [src])

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      className={clsx("transition-all duration-300",
        isLoading && "bg-softGrey animate-pulse",
        className,
      )}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setImgSrc(fallbackSrc);
        setIsLoading(false);
      }}
    />
  )
}

export default ImageWithFallback
