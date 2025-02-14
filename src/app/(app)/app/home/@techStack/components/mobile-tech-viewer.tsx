import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import CarouselItems from "./carousel-items";

function MobileTechViewer() {
  return (
    <section className="sm:hidden w-full flex justify-center px-5">
      <Carousel className="w-full mx-10" opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItems />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default MobileTechViewer