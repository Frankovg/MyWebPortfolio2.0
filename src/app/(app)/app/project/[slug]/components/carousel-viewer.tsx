import { useMemo } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Fade from "embla-carousel-fade"
import ImageWithFallback from "@/components/image-with-fallback"
import { FALLBACK_IMG } from "@/lib/constants"
import { Gallery } from "@prisma/client"

type CarouselViewerProps = {
  images: Gallery[],
  setMainApi: (api: CarouselApi) => void
}

function CarouselViewer({ images, setMainApi }: CarouselViewerProps) {

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

  return (
    <Carousel
      setApi={setMainApi}
      plugins={[Fade()]}
      opts={{
        align: "center",
        containScroll: false
      }}
    >
      <CarouselContent className="mb-4">{mainImage}</CarouselContent>
    </Carousel >
  )
}

export default CarouselViewer 