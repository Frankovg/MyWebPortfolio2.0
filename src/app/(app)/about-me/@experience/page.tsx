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
          <h3 className="text-2xl font-semibold">A-SAFE Digital</h3>
          <p className="text-base md:text-xl font-light leading-7 md:leading-8 mb-6">
            Progressed through three roles over 3 years in software development for A-SAFE's global industrial safety business:
          </p>
          <ul className="list-disc list-outside space-y-2 ml-4 mb-8 text-base md:text-md font-light leading-4 md:leading-6">
            <li>
              <span className="font-semibold">Full-Stack Developer — CRM & Web Ecosystem (2025): </span>
              Transitioned to a cross-functional team building a monolithic web ecosystem supporting A-SAFE's core business operations, centered on a CRM platform. Worked as a full-stack developer using Ruby on Rails with Inertia.js and React, contributing to both front-end and back-end features.
            </li>
            <li>
              <span className="font-semibold">Project Lead — Safeguru E-commerce (2024): </span>
              Promoted to lead the development of a modernized B2C platform. Introduced and consolidated a new tech stack (Tailwind CSS, shadcn/ui, Zustand, React Query), improving scalability, maintainability, and user experience.
            </li>
            <li>
              <span className="font-semibold">Front-End Developer — Safeguru E-commerce (2023): </span>
              Joined to work on Safeguru, an e-commerce platform serving B2C and B2B users with a custom CMS. Focused on UX/UI design and front-end architecture using React, Next.js, TypeScript, and Styled Components.
            </li>
          </ul>
          <p className="text-base md:text-md font-semibold leading-7 md:leading-8 mb-6">
            Explore more about:
          </p>
          <div>
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
          <h3 className="text-2xl font-semibold">Full Stack Developer at Coolx</h3>

          <p className="text-base md:text-xl font-light leading-7 md:leading-8 mb-6">
            Built the MVP of an environmental compliance platform leveraging satellite imagery and AI to verify deforestation-free supply chains under the EUDR. Responsible for database design (MySQL), API development (Node.js), and front-end implementation (React, Bootstrap), including UX/UI design of supplier evaluation and farm verification workflows.
          </p>

          <p className="text-base md:text-md font-semibold leading-7 md:leading-8 mb-6">
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

  ];

  return (
    <Section id="experience" className="pt-24">
      <Timeline data={data} />
    </Section>
  );
}

export default Experience;
