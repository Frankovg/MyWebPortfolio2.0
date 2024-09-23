'use client'

import { useEffect, useState } from "react"

//Types
import { Category, Project } from "@prisma/client"

//Components
import ProjectCard from "./project-card"

interface ICategoryWithProjects extends Category {
  projects: Project[]
}

type CategoriesProps = {
  categories: ICategoryWithProjects[]
}

function Categories({ categories }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value)
  const [transitionClass, setTransitionClass] = useState('opacity-100 translate-y-0')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const selectedCategoryObj = categories.find(cat => cat.value === selectedCategory)

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

  const handleCategoryChange = (category: string) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
      }, 400)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="divide-x-2 flex">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            title="Category selector"
            onClick={() => handleCategoryChange(category.value)}
            className={`px-4 transition-all duration-600 ease-in-out hover:bg-white/5 ${selectedCategory === category.value && 'bg-white/5 text-white'}`}
          >
            <h2 className="text-left text-xl">{category.name}</h2>
          </button>
        ))}
      </div>

      <div className={`transition-all duration-500 ease-in-out ${transitionClass} max-sm:w-full w-1/2 min-[930px]:w-3/5 px-12 grid grid-cols-3 min-[640px]:max-[799px]:grid-cols-2 min-[800px]:max-[929px]:grid-cols-3 min-[930px]:grid-cols-4 grid-rows-3 gap-8`}>
        {selectedCategoryObj && selectedCategoryObj.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Categories