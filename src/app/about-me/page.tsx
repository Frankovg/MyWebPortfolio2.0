import Image from 'next/image'
import H4 from "@/components/h4"

export default function AboutMe() {
  return (
    <main className="flex text-base flex-col items-center justify-between p-24">
      <div className="w-full h-auto pt-24 pb-14">
        <Image
          src='/images/about-me-banner.webp'
          alt='A picture of Franco in an abandoned place in front of a graffitied wall.'
          className='object-contain w-full h-auto opacity-70'
          width={0}
          height={0}
          sizes={'100%'}
          quality={50}
        />
      </div>
      <H4>About me</H4>
    </main>
  );
}
