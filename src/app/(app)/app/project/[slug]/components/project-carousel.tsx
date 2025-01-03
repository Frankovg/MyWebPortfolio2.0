'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

//Carousel
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

//Components
import ImageWithFallback from "@/components/image-with-fallback"
import { FALLBACK_IMG } from "@/lib/constants"

//Types
import { Gallery } from "@prisma/client"
import CarouselViewer from "./carousel-viewer"

type ProjectCarouselProps = {
  images: Gallery[]
}

//TODO: If it needs lazy loading look for more information here https://www.embla-carousel.com/examples/predefined/
function ProjectCarousel({ images }: ProjectCarouselProps) {
  const mainApiRef = useRef<CarouselApi>()
  const thumbnailApiRef = useRef<CarouselApi>()

  const [current, setCurrent] = useState(0)

  const setMainApi = useCallback((api: CarouselApi) => {
    mainApiRef.current = api
  }, [])

  const setThumbnailApi = useCallback((api: CarouselApi) => {
    thumbnailApiRef.current = api
  }, [])

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
    if (!mainApiRef.current || !thumbnailApiRef.current) {
      return
    }

    // Initialize both carousels to index 0
    setCurrent(0)
    mainApiRef.current.scrollTo(0)
    thumbnailApiRef.current.scrollTo(0)

    const handleTopSelect = () => {
      const selected = mainApiRef.current!.selectedScrollSnap()
      setCurrent(selected)
      thumbnailApiRef.current!.scrollTo(selected)
    }

    const handleBottomSelect = () => {
      const selected = thumbnailApiRef.current!.selectedScrollSnap()
      setCurrent(selected)
      mainApiRef.current!.scrollTo(selected)
    }

    mainApiRef.current.on("select", handleTopSelect)
    thumbnailApiRef.current.on("select", handleBottomSelect)

    return () => {
      mainApiRef.current?.off("select", handleTopSelect)
      thumbnailApiRef.current?.off("select", handleBottomSelect)
    }
  }, [])

  const handleClick = (index: number) => {
    setCurrent(index)

    mainApiRef.current?.scrollTo(index)
    thumbnailApiRef.current?.scrollTo(index)
  }

  return (
    <div className="w-full">
      <CarouselViewer images={images} setMainApi={setMainApi} />

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