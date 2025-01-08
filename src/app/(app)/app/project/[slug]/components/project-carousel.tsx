'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

//Carousel
import { CarouselApi, CarouselItem } from "@/components/ui/carousel"
import CarouselViewer from "./carousel-viewer"
import CarouselThumbnail from "./carousel-thumbnail"
import ExpanderButton from "./expander-button"

//Types
import { Gallery } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import ImageWithFallback from "@/components/image-with-fallback"
import { FALLBACK_IMG } from "@/lib/constants"
import CarouselExpanded from "./carousel-expanded"

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

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index}>
          <ImageWithFallback
            className='object-cover md:object-contain w-full h-full max-h-[80vh]'
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
  // TODO: Quitar carousel del dialog y solo ampliar la imagen seleccionada
  return (
    <Dialog >
      <div className="relative w-full">
        <DialogTrigger asChild>
          <ExpanderButton onClick={() => console.log('expand')} />
        </DialogTrigger>
        <CarouselViewer
          images={mainImage}
          setMainApi={setMainApi}
        />
        <CarouselThumbnail
          images={thumbnailImages}
          setThumbnailApi={setThumbnailApi}
        />
      </div >

      <DialogContent className="max-w-screen h-fit max-h-screen">
        <DialogTitle className="hidden" />
        <CarouselExpanded images={mainImage} />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectCarousel