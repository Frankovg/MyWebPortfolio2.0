import Image from 'next/image'
import H4 from "@/components/h4"
import Section from '@/components/section'
import BannerContainer from '@/components/banner-container'
import { ABOUT_ME, ABOUT_ME_BANNER } from './constants/constants'
import { Suspense } from 'react'
import Loading from './loading'

export default function AboutMe() {
  return (
    <Suspense fallback={<Loading />}>
      <Section id="about-me">
        <BannerContainer>
          <Image
            src={ABOUT_ME_BANNER}
            alt={ABOUT_ME['alt']}
            className='object-cover md:object-contain w-auto md:w-full h-full md:h-auto opacity-70'
            width={0}
            height={0}
            sizes={'100%'}
            quality={50}
          />
        </BannerContainer>
        <H4>About me</H4>
        <div className='max-w-am flex flex-col gap-4 text-base lg:text-xl font-light leading-7 lg:leading-8'>
          <p>{ABOUT_ME['paragraph1']}</p>
          <p>{ABOUT_ME['paragraph2']}</p>
        </div>
      </Section>
    </Suspense>
  )
}
