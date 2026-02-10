import Image from "next/image";

import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";

async function Experience() {

  const data = [
    {
      title: "Since 2023",
      content: (
        <div>
          <h3 className="text-xl 930:text-2xl font-semibold">A-SAFE Digital</h3>
          <p className="text-base 930:text-xl font-light leading-6 930:leading-8 mb-6">
            Progressed through three roles over 3 years in software development for A-SAFE's global industrial safety business:
          </p>
          <ul className="930:list-disc 930:list-outside space-y-4 930:space-y-2 930:ml-4 mb-8 text-base 930:text-md font-light leading-5 930:leading-6">
            <li>
              <span className="font-semibold">Full-Stack Developer — CRM & Web Ecosystem (2025): <br className="930:hidden" /></span>
              Transitioned to a cross-functional team building a monolithic web ecosystem supporting A-SAFE's core business operations, centered on a CRM platform. Worked as a full-stack developer using Ruby on Rails with Inertia.js and React, contributing to both front-end and back-end features.
            </li>
            <li>
              <span className="font-semibold">Project Lead — Safeguru E-commerce (2024): <br className="930:hidden" /></span>
              Promoted to lead the development of a modernized B2C platform. Introduced and consolidated a new tech stack (Tailwind CSS, shadcn/ui, Zustand, React Query), improving scalability, maintainability, and user experience.
            </li>
            <li>
              <span className="font-semibold">Front-End Developer — Safeguru E-commerce (2023): <br className="930:hidden" /></span>
              Joined to work on Safeguru, an e-commerce platform serving B2C and B2B users with a custom CMS. Focused on UX/UI design and front-end architecture using React, Next.js, TypeScript, and Styled Components.
            </li>
          </ul>
          <p className="text-base 930:text-md font-semibold leading-7 930:leading-8 mb-6">
            Explore more about:
          </p>
          <div className="flex flex-col 930:flex-row max-930:space-y-4 w-full max-930:items-center">
            <a
              href="https://www.asafe.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
                variant="secondary"
                size="default"
              >
                A-SAFE
              </Button>
            </a>
            <a
              href="https://asafedigital.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
                variant="secondary"
                size="default"
              >
                A-SAFE Digital
              </Button>
            </a>
            <a
              href="https://safeguru.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
                variant="secondary"
                size="default"
              >
                Safeguru
              </Button>
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <h3 className="text-2xl font-semibold">Full Stack Developer - Coolx</h3>

          <p className="text-base 930:text-xl font-light leading-7 930:leading-8 mb-6">
            Built the MVP of an environmental compliance platform leveraging satellite imagery and AI to verify deforestation-free supply chains under the EUDR. Responsible for database design (MySQL), API development (Node.js), and front-end implementation (React, Bootstrap), including UX/UI design of supplier evaluation and farm verification workflows.
          </p>

          <p className="text-base 930:text-md font-semibold leading-7 930:leading-8 mb-6">
            Explore more about the company:
          </p>
          <div>
            <a
              href="https://coolx.earth/home/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
                variant="secondary"
                size="default"
              >
                Coolx
              </Button>
            </a>
          </div>
        </div>
      ),
    },
    {
      secondary: true,
      title: "2021",
      content: (
        <div>
          <h3 className="text-xl font-semibold">Visual Merchandiser - Ikea</h3>

          <p className="text-base 930:text-lg font-light leading-7 930:leading-6">
            Planned and executed in-store visual displays in line with IKEA brand guidelines, enhancing customer experience and supporting product sales.
          </p>
        </div>
      )
    },
    {
      secondary: true,
      title: "2020",
      content: (
        <div>
          <h3 className="text-xl font-semibold">Art Director - Pubext</h3>

          <p className="text-base 930:text-lg font-light leading-7 930:leading-6 mb-6">
            Led the creative direction of outdoor advertising campaigns, developing visual concepts and overseeing design execution to ensure strong brand impact across exterior media.
          </p>
        </div>
      )
    },
    {
      secondary: true,
      title: "2018",
      content: (
        <div>
          <h3 className="text-xl font-semibold">LIFE GOALS 🧉 🦘 🪭 ✈️</h3>

          <p className="text-base 930:text-lg font-light leading-7 930:leading-6 mb-6">
            To continue growing professionally in international and multicultural environments, building on nearly three years of work and travel experience across Australia. This period strengthened my adaptability, independence, and advanced English communication skills.
          </p>
          <p className="text-base 930:text-lg font-light leading-7 930:leading-6 mb-6">
            Since relocating to Málaga in 2020, I have focused on establishing long-term professional growth in Spain while maintaining a global mindset and openness to international opportunities.
          </p>
        </div>
      )
    },
    {
      secondary: true,
      title: "2015",
      content: (
        <div>
          <h3 className="text-xl font-semibold">Industrial Designer - Grupo Quiero</h3>

          <p className="text-base 930:text-lg font-light leading-7 930:leading-6 mb-6">
            Designed and developed Point of Purchase (P.O.P.) displays and retail materials, translating brand concepts into functional and visually compelling solutions that enhance shopper engagement and support commercial objectives.
          </p>
        </div>
      )
    }
  ];

  return (
    <Section id="experience" className="pt-24">
      <Timeline data={data} />
    </Section>
  );
}

export default Experience;
