'use client'

import Image, { ImageProps } from "next/image"
import { useEffect, useState } from "react"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, ...rest } = props

  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  )
}

export default ImageWithFallback