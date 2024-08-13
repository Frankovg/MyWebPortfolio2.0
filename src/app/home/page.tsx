import Link from "next/link";
import TextAnimation from "./components/text-animation"
import ArrowRight from "@/icons/arrow-right";

// List of titles for the animation
const toRotate = [
  "Front-End Developer",
  "UX/UI Designer",
  "Full-Stack Web Dev",
  "Industrial Designer",
  "Web Developer",
]

export default function Home() {
  return (
    <section id="home" className="h-[70vh] flex text-base flex-col items-center p-24">
      <div className="w-full text-center [&_h1]:text-white space-y-3">
        <h2>Welcome to my portfolio</h2>
        <h1 className="text-7xl font-semibold">Hi! I&apos;m Franco</h1>
        <TextAnimation texts={toRotate} />
        <h3 className="max-w-[920px] mx-auto py-8">
          As a <span className="font-semibold text-white">Front-End Developer with a solid design background</span>, I bring a unique perspective to my work, crafting web apps that look great and feel intuitive. Check out my work, and let&apos;s connect if you&apos;ve got questions or want to team up.
        </h3>
        <div className="w-fit mx-auto">
          <Link
            href="#contact"
            className="group text-white font-bold flex items-center"
          >
            <span>Let&apos;s connect</span>
            <ArrowRight className="inline-block ml-1 group-hover:translate-x-[5px] duration-300 ease-in w-auto h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
