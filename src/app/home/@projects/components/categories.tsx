'use client'

import { useEffect, useState } from "react"

//Types
import { Category, Project } from "@prisma/client"

//Components
import ProjectCard from "./project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ICategoryWithProjects extends Category {
  projects: Project[]
}

type CategoriesProps = {
  categories: ICategoryWithProjects[]
}

function Categories({ categories }: CategoriesProps) {
  const [transitionClass, setTransitionClass] = useState('opacity-100 translate-y-0')
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (isTransitioning) {
      setTransitionClass('opacity-0 translate-y-2')
      const timer = setTimeout(() => {
        setTransitionClass('opacity-100 translate-y-0')
        setIsTransitioning(false)
      }, 400)

      return () => clearTimeout(timer);
    }
  }, [isTransitioning])

  return (
    <Tabs
      defaultValue='web-development'
      className="flex flex-col w-full items-center"
    >
      <TabsList className="w-full flex flex-col lg:flex-row justify-around lg:bg-background h-auto p-2">
        {categories.map((category) => {
          return (
            <TabsTrigger
              key={category.id}
              value={category.value}
              className='w-full data-[state=active]:bg-white/5 data-[state=active]:text-white data-[state=active]:font-bold'
              disabled={category.projects.length === 0}
            >
              <h2
                className='text-2xl px-4 transition-all duration-300 ease-in-out'
              >
                {category.name}
              </h2>
            </TabsTrigger>
          )
        })}
      </TabsList>

      {categories.map((category) => {
        return (
          <TabsContent key={category.id} value={category.value}>
            {category.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

export default Categories