import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Fade from "embla-carousel-fade"
import { Gallery } from "@prisma/client"

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