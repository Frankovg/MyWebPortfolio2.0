'use client'

import { useEffect, useState } from "react"

//Components
import ProjectCard from "./project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

//Types
import { CategoriesProps } from "../types/types"

function Categories({ categories }: CategoriesProps) {
  const [currentTab, setCurrentTab] = useState('web-development')
  const [nextTab, setNextTab] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setCurrentTab(nextTab!)
        setNextTab(null)
        setIsTransitioning(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [isTransitioning, nextTab])

  const handleTabChange = (value: string) => {
    setNextTab(value)
    setIsTransitioning(true)
  }

  return (
    <Tabs
      defaultValue='web-development'
      className="flex flex-col w-full items-center space-y-8"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full flex flex-col lg:flex-row justify-around lg:bg-background h-auto p-2 rounded">
        {categories.map((category) => {
          return (
            <TabsTrigger
              key={category.id}
              value={category.value}
              className='w-full data-[state=active]:bg-white/5 data-[state=active]:text-white data-[state=active]:font-bold rounded'
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
        const isCurrent = category.value === currentTab
        const isNext = category.value === nextTab
        return (
          <TabsContent
            key={category.id}
            value={category.value}
            className={`m-0 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4 transition-all duration-300 ease-out ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${isNext && 'opacity-0 translate-y-2'}`}
          >
            {category.projects.map((project, index) => {
              if (index <= 5) {
                return (
                  <ProjectCard key={project.id} project={project} />
                )
              }
            })}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

export default Categories