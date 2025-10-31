import Fade from "embla-carousel-fade"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { JSX } from "react"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

type CarouselViewerProps = {
  images: JSX.Element[],
  setMainApi: (api: CarouselApi) => void
}

function CarouselViewer({ images, setMainApi }: CarouselViewerProps) {

  return (
    <Carousel
      setApi={setMainApi}
      plugins={[Fade(), WheelGesturesPlugin()]}
      opts={{
        align: "center",
        containScroll: false
      }}
    >
      <CarouselContent className="mb-4">{images}</CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel >
  )
}

export default CarouselViewer 