import { JSX } from "react"
import { Carousel, CarouselApi, CarouselContent } from "@/components/ui/carousel"
import Fade from "embla-carousel-fade"

type CarouselViewerProps = {
  images: JSX.Element[],
  setMainApi: (api: CarouselApi) => void
}

function CarouselViewer({ images, setMainApi }: CarouselViewerProps) {

  return (
    <Carousel
      setApi={setMainApi}
      plugins={[Fade()]}
      opts={{
        align: "center",
        containScroll: false
      }}
    >
      <CarouselContent className="mb-4">{images}</CarouselContent>
    </Carousel >
  )
}

export default CarouselViewer 