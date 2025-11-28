import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { JSX } from "react"

import { Carousel, CarouselApi, CarouselContent } from "@/components/ui/carousel"

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
      plugins={[WheelGesturesPlugin()]}
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
