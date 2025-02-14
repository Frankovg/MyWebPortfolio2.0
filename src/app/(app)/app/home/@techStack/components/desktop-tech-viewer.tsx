'use client'

import { useEffect, useState } from "react"

import { CATEGORIES } from "../utils/client-constants"

import TechCard from "./tech-card"

//TODO: Its probably better to use the tabs component here
function DesktopTechViewer() {
  const [selectedCategory, setSelectedCategory] = useState('basics')
  const [transitionClass, setTransitionClass] = useState('opacity-100 translate-y-0')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const selectedCategoryObj = CATEGORIES.find(cat => cat.value === selectedCategory)

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
    <div className="max-sm:hidden w-full flex">
      <div className={`transition-all duration-500 ease-in-out ${transitionClass} max-sm:w-full w-1/2 930:w-3/5 px-12 grid grid-cols-3 sm:max-799:grid-cols-2 800:max-929:grid-cols-3 930:grid-cols-4 grid-rows-3 gap-8`}>
        {selectedCategoryObj && selectedCategoryObj.techs.map(tech => (
          <TechCard
            key={tech.value}
            tech={tech}
            className="inline-block h-28 max-h-28 w-auto object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-105"
          />
        ))}
      </div>

      <div className="max-sm:w-full w-1/2 930:w-2/5 flex flex-col text-lg">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            title="Tech stack category"
            onClick={() => handleCategoryChange(cat.value)}
            className={`text-left pt-3 mt-3 pb-2 pl-1 border-b border-solid transition-all duration-600 ease-in-out hover:bg-white/5 ${selectedCategory === cat.value && 'bg-white/5 text-xl text-white'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DesktopTechViewer