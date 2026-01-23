import { Metadata } from "next";
import Image from "next/image";

import BannerContainer from "@/components/banner-container";
import H4 from "@/components/primitives/h4";
import Section from "@/components/section";

import { ABOUT_ME, ABOUT_ME_BANNER } from "./constants/constants";

export const metadata: Metadata = {
  title: "About Me",
  description: "Full-stack developer with a background in Industrial Design. From Argentina to Australia to Spain, blending creativity with code to build meaningful digital experiences.",
  alternates: {
    canonical: "https://franamoroso.com/about-me",
  },
  openGraph: {
    title: "Franco Gabriel Amoroso",
    description: "Hi! This is my Web-Portfolio, I hope you like it!",
    url: "https://franamoroso.com/about-me",
    type: "website",
    images: [
      {
        url: ABOUT_ME_BANNER,
        width: 1200,
        height: 630,
        alt: "Franco Gabriel Amoroso - Full-Stack Developer & Designer",
      },
    ],
  },
}

export default function AboutMe() {
  return (
    <Section id="about-me">
      <BannerContainer>
        <Image
          src={ABOUT_ME_BANNER}
          alt={ABOUT_ME["alt"]}
          className="object-cover md:object-contain w-auto md:w-full h-full md:h-auto opacity-70"
          width={0}
          height={0}
          sizes={"100%"}
          quality={50}
          priority
        />
      </BannerContainer>
      <H4>About me</H4>
      <div className="max-w-am flex flex-col gap-4 text-base lg:text-xl font-light leading-7 lg:leading-8">
        <p>{ABOUT_ME["paragraph1"]}</p>
        <p>{ABOUT_ME["paragraph2"]}</p>
      </div>
    </Section>
  );
}
