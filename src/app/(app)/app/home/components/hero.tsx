import AnimatedArrowRight from "@/components/primitives/animated-arrow-right";
import H3 from "@/components/primitives/h3";
import ScrollLink from "@/components/primitives/scroll-link";
import Section from "@/components/section";

import { AnimatedHero } from "./animated-hero";

export const Hero = () => {
  return (
    <Section id="home" className="h-[50vh] pt-24">
      <div className="w-full text-center [&_h1]:text-white [&_h1]:text-3xl 550:[&_h1]:text-5xl 830:[&_h1]:text-7xl [&_h1]:font-semibold space-y-0 550:space-y-3">
        <h4>Welcome to my portfolio</h4>
        <h1>
          <span>Hi! I&apos;m Franco</span>
          <AnimatedHero />
        </h1>
        {/* <TextAnimation texts={toRotate} /> */}
        <H3>
          As a{" "}
          <span className="font-semibold text-white">
            Full-Stack Developer with a solid design background
          </span>
          , I bring a unique perspective to my work, creating web apps that
          look great and feel intuitive. Check out my work, and let&apos;s
          connect if you&apos;ve got questions or want to team up.
        </H3>
        <div className="w-fit mx-auto">
          <ScrollLink
            id="contact"
            className="group text-white font-bold flex items-center text-lg"
          >
            <span>Let&apos;s connect</span>
            <AnimatedArrowRight />
          </ScrollLink>
        </div>
      </div>
    </Section>
  )
}
