'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import AutoScroll from 'embla-carousel-auto-scroll'
import { REFERRALS } from "@/lib/constants"

function Prefooter() {
  return (
    <section className="w-full mt-12 py-6 cursor-move bg-background/30">
      <Carousel
        className="w-full"
        opts={{
          loop: true
        }}
        plugins={[
          AutoScroll({
            speed: 1,
            stopOnInteraction: false,
          })
        ]}
      >
        <CarouselContent>
          {REFERRALS.map((ref) => (
            <CarouselItem key={ref.id} className="basis-full sm:max-[1099px]:basis-[60%] min-[1100px]:basis-[40%]">
              <article className="grid grid-cols-12 gap-0 ">
                <div className="col-span-2 flex justify-end">
                  <Image
                    src={ref.img}
                    alt='LinkIn profile picture'
                    className="w-[48px] h-[48px] rounded-full object-cover mr-4"
                  />
                </div>
                <div className="col-span-10 flex flex-col text-left">
                  <p className="font-medium text-lg leading-6">{ref.name}</p>
                  <p className="text-xs opacity-80">{ref.role}</p>
                </div>
                <div className="row-start-2 col-start-3 col-span-10">
                  <p className="italic">{`"${ref.text}"`}</p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Prefooter