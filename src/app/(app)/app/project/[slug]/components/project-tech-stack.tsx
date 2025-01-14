import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectTechStackProps = {
  stack: string[]
}

function ProjectTechStack({ stack }: ProjectTechStackProps) {
  // const filteredTechs = CATEGORIES.flatMap(category => 
  //   category.techs.filter(tech => stack.includes(tech.name.toLowerCase()))
  // )

  return (
    <Card className="w-1/2 border-none">
      <CardHeader>
        <CardTitle>Technologies</CardTitle>
        <CardDescription>Technologies and tools used in this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-8">
          {/* {filteredTechs.map(tech => (
            <TechCard
              key={tech.value}
              tech={tech}
              className="inline-block h-28 max-h-28 w-auto object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-105"
            />
          ))} */}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectTechStack