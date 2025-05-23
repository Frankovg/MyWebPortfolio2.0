import { Suspense } from "react";

import AnimatedArrowRight from "@/components/primitives/animated-arrow-right";
import H3 from "@/components/primitives/h3";
import ScrollLink from "@/components/primitives/scroll-link";
import Section from "@/components/section";

import TextAnimation from "./components/text-animation";
import Loading from "./loading";

const toRotate = [
  "Front-End Developer",
  "UX/UI Designer",
  "Industrial Designer",
  "Web App Developer",
];

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Section id="home" className="h-[50vh] pt-24">
        <div className="w-full text-center [&_h1]:text-white [&_h1]:text-3xl 550:[&_h1]:text-5xl 830:[&_h1]:text-7xl [&_h1]:font-semibold space-y-0 550:space-y-3">
          <h4>Welcome to my portfolio</h4>
          <h1>Hi! I&apos;m Franco</h1>
          <TextAnimation texts={toRotate} />
          <H3>
            As a{" "}
            <span className="font-semibold text-white">
              Front-End Developer with a solid design background
            </span>
            , I bring a unique perspective to my work, crafting web apps that
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
    </Suspense>
  );
}
