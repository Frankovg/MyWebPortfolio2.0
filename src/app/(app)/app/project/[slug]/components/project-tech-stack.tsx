'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tech } from "@prisma/client"
import TechCard from "../../../home/@techStack/components/tech-card";
import { ALL_TECHS } from "@/lib/client-constants";

type ProjectTechStackProps = {
  techStack: Tech[]
}

function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  const filteredTechs = ALL_TECHS.filter(tech =>
    techStack.some(stackTech => stackTech.name === tech.name)
  )

  return (
    <Card className="w-full 930:w-1/2 border-none">
      <CardHeader>
        <CardTitle className="text-white">Technologies</CardTitle>
        <CardDescription>The most relevant tools used in this project</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-3 gap-8">
          {filteredTechs.map(tech => (
            <TechCard
              key={tech.value}
              tech={tech}
              className="inline-block h-28 max-h-28 w-auto object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-105"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectTechStack