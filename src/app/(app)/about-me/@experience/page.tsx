import clsx from "clsx";

import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";

import { EXPERIENCE } from "./constants/constants";

async function Experience() {

  const data = EXPERIENCE.map((e) => {
    return {
      secondary: e.secondary,
      title: e.title,
      content: (
        <div>
          <h3 className={clsx("font-semibold",
            e.secondary ? "text-lg 930:text-xl" : "text-xl 930:text-2xl"
          )}>
            {e.content.company}
          </h3>

          {e.content.descriptionShort &&
            <p className={clsx("text-base font-light leading-6 mb-6",
              e.secondary ? "" : "930:text-xl 930:leading-8"
            )}>
              {e.content.descriptionShort}
            </p>
          }

          {e.content.descriptionLong &&
            <ul className={clsx("space-y-4 930:space-y-2 mb-8 text-base font-light leading-6",
              e.content.descriptionLong.listed && "930:list-disc 930:list-outside 930:ml-4 930:text-md"
            )}>
              {e.content.descriptionLong.paragraphs?.map((d) => (
                <li key={d.paragraph}>
                  {d.title && (<span className="font-semibold">{d.title} <br className="930:hidden" /></span>)}
                  {d.paragraph}
                </li>
              ))}
            </ul>
          }

          {e.content.external && (
            <>
              <p className="text-base 930:text-md font-semibold leading-7 930:leading-8 mb-6">
                {e.content.external.title}
              </p>

              <div className="flex flex-col md:flex-row max-md:space-y-4 w-full max-930:items-center">
                {e.content.external.links?.map((l) => (
                  <a
                    href={l.href}
                    key={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
                      variant="secondary"
                      size="default"
                    >
                      {l.name}
                    </Button>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )
    }
  })

  return (
    <Section id="experience" className="pt-24">
      <Timeline data={data} />
    </Section>
  );
}

export default Experience;
