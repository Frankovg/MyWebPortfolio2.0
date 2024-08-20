import Image from 'next/image'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CATEGORIES } from "@/lib/constants";

function MobileTechViewer() {
  return (
    <section className="sm:hidden w-full flex justify-center px-5">
      <Carousel className="w-full mx-10">
        <CarouselContent>
          {CATEGORIES.map((cat) => (
            <CarouselItem key={cat.value} className="flex items-center">
              <div className="w-full grid grid-cols-2">
                <h5 className="col-start-1 col-span-2 text-center font-bold text-base pb-6">
                  {cat.label}
                </h5>
                {cat.techs.map(tech => (
                  <div key={tech.name} className="flex justify-center">
                    <Image
                      src={tech.icon}
                      alt={`${tech.name} logo`}
                      id={tech.name}
                      className="inline-block py-2.5 px-1.5"
                      width={85}
                      height={85}
                    />
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default MobileTechViewer