import Image from 'next/image'
import H4 from "@/components/h4"
import Section from '@/components/section'

const aboutMe = {
  "paragraph1": "My name is Franco Gabriel Amoroso, and my journey with technology began in my childhood in Argentina. This passion has been a constant in my life, sparked by growing up around my father's computer store in the 90s, a place filled with vintage computers that marked the dawn of the modern computer science. In 2018, I moved to Australia, spending three formative years immersed in a new culture and expanding my perspectives. Since 2020, I've made my home in the south of Spain.",
  "paragraph2": "Alongside my background as an Industrial Designer, my fascination with both hardware and software has always felt second nature, becoming not just a beloved hobby but an invaluable tool. This connection to technology continues to drive my curiosity and inspire my work."
}

export default function AboutMe() {
  return (
    <Section id="about-me">
      <div className="w-full h-[35vh] md:h-auto pb-14">
        <Image
          src='/images/about-me-banner.webp'
          alt='A picture of Franco in an abandoned place in front of a graffitied wall.'
          className='object-cover md:object-contain w-auto md:w-full h-full md:h-auto opacity-70'
          width={0}
          height={0}
          sizes={'100%'}
          quality={50}
        />
      </div>
      <H4>About me</H4>
      <div className='max-w-am flex flex-col gap-4 text-base lg:text-xl font-light leading-7 lg:leading-8'>
        <p>{aboutMe['paragraph1']}</p>
        <p>{aboutMe['paragraph2']}</p>
      </div>
    </Section>
  )
}
