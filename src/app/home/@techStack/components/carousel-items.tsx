

import { CarouselItem } from "@/components/ui/carousel"
import { CATEGORIES } from "@/lib/constants"

function CarouselItems() {
  return (
    <>
      {CATEGORIES.map((cat) => (
        <CarouselItem key={cat.value} className="flex items-center">
          <div className="w-full grid grid-cols-2">
            <h5 className="col-start-1 col-span-2 text-center font-bold text-base pb-6">
              {cat.label}
            </h5>
            {cat.techs.map(tech => (
              <div key={tech.name} className="flex justify-center">
                <tech.icon />
              </div>
            ))}
          </div>
        </CarouselItem>
      ))}
    </>
  )
}

export default CarouselItems