import { Carousel, CarouselContent } from "@/components/ui/carousel"
import { Gallery } from "@prisma/client"

type CarouselExpandedProps = {
  images: JSX.Element[],
}

function CarouselExpanded({ images }: CarouselExpandedProps) {
  return (
    <Carousel
      className="my-4"
      // setApi={setMainApi}
      // plugins={[Fade()]}
      opts={{
        align: "center",
        containScroll: false
      }}
    >
      <CarouselContent >{images}</CarouselContent>
    </Carousel >
  )
}

export default CarouselExpanded