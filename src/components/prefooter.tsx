'use client'

import Image from "next/image"

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import AutoScroll from 'embla-carousel-auto-scroll'

import img1 from '/public/images/in_profile_1.webp'
import img2 from '/public/images/in_profile_2.webp'
import img3 from '/public/images/in_profile_3.webp'
import img4 from '/public/images/in_profile_4.webp'


const referrals = [
  {
    id: 1,
    img: img1,
    name: 'Jazmin Feige',
    role: 'Visual Merchandising Senior Manager at EssilorLuxottica',
    text: 'Franco is an excellent professional. We worked together as a team for several years in a very smooth and efficient manner. We always communicated quickly and effectively, and his contributions had a significant impact on the projects we worked on together. We formed a team where the priority was to achieve the best results through a very creative, organized, and high-quality approach.'
  },
  {
    id: 2,
    img: img2,
    name: 'Mariana Swidzinski',
    role: 'Creative Project Manager at EcoFold',
    text: "I worked with Franco on several occasions, the first time on the same team, with me as the designer and him in charge of prototyping. Professionally, I highlight the speed and commitment with which he handles himself during busy times and his attention to detail. He offers improvement suggestions when necessary and doesn't hesitate to share his knowledge. On a personal level, he has an excellent attitude, always positive and collaborative. I would work with him again—highly recommended!"
  },
  {
    id: 3,
    img: img3,
    name: 'Gustavo Anelli',
    role: 'Industrial Designer at Zedis',
    text: "Franco is an excellent person and designer. I had the opportunity to see him work particularly in the development area, creating technical drawings for production, where he demonstrated his ability to work very well under pressure, handling a large volume of tasks with extremely tight deadlines. He stands out for his responsibility, efficiency, and speed. His high level of commitment and dedication is evident in the details of his presentations."
  },
  {
    id: 4,
    img: img4,
    name: 'Pablo Daniel Pellizzoni',
    role: 'Head of department at Grupo Developer',
    text: "Not only a great person, but also a great colleague and designer, and he has been an excellent student. Always showing the proactivity needed and seeking new horizons! Wishing you success in this new chapter, and you're missed here in Argentina. Great designer!"
  },
]

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
          {referrals.map((ref) => (
            <CarouselItem key={ref.id} className="basis-[40%]">
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