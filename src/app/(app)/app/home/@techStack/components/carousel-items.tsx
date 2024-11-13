import { CarouselItem } from "@/components/ui/carousel"
import { CATEGORIES } from "../../constants/constants"

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
              <div key={tech.name} className="flex justify-center p-4 h-40 max-h-40">
                <tech.icon className="h-auto w-auto" />
              </div>
            ))}
          </div>
        </CarouselItem>
      ))}
    </>
  )
}

export default CarouselItems