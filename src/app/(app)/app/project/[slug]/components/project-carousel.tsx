'use client'

import ImageWithFallback from "@/components/image-with-fallback"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { FALLBACK_IMG } from "@/lib/constants"
import { Gallery } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"

type ProjectCarouselProps = {
  images: Gallery[]
}

function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
        >
          <ImageWithFallback
            className='object-cover md:object-contain w-auto h-full'
            src={image.imageUrl}
            fallbackSrc={FALLBACK_IMG}
            alt={`Carousel Main Image ${index + 1}`}
            width={0}
            height={0}
            sizes={'100%'}
            quality={50}
          />
        </CarouselItem>
      )),
    [images],
  )

  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="basis-1/4 hover:cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <ImageWithFallback
            className={`${index === current && "border-2"} w-full h-full object-contain`}
            src={image.imageUrl}
            fallbackSrc={FALLBACK_IMG}
            alt={`Carousel Thumbnail Image ${index + 1}`}
            width={0}
            height={0}
            sizes={'100%'}
            quality={50}
          />
        </CarouselItem>
      )),
    [images, current],
  )

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap()
      setCurrent(selected)
      thumbnailApi.scrollTo(selected)
    }

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap()
      setCurrent(selected)
      mainApi.scrollTo(selected)
    };

    mainApi.on("select", handleTopSelect)
    thumbnailApi.on("select", handleBottomSelect)

    return () => {
      mainApi.off("select", handleTopSelect)
      thumbnailApi.off("select", handleBottomSelect)
    }
  }, [mainApi, thumbnailApi])

  const handleClick = (index: number) => {
    if (!mainApi || !thumbnailApi) {
      return
    }
    thumbnailApi.scrollTo(index)
    mainApi.scrollTo(index)
    setCurrent(index)
  }

  return (
    <div className="w-full max-w-xl">
      <Carousel setApi={setMainApi}>
        <CarouselContent className="mb-4">{mainImage}</CarouselContent>
      </Carousel >

      <Carousel
        setApi={setThumbnailApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent>{thumbnailImages}</CarouselContent>
      </Carousel>
    </div >
  )
}

export default ProjectCarousel