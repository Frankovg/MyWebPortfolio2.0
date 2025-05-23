import { JSX } from "react"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

type CarouselThumbnailProps = {
  images: JSX.Element[],
  setThumbnailApi: (api: CarouselApi) => void
}

function CarouselThumbnail({
  images,
  setThumbnailApi
}: CarouselThumbnailProps) {

  return (
    <Carousel
      setApi={setThumbnailApi}
      opts={{
        align: "start",
        dragFree: true,
      }}
    >
      <CarouselContent>{images}</CarouselContent>
    </Carousel>
  )
}

export default CarouselThumbnail