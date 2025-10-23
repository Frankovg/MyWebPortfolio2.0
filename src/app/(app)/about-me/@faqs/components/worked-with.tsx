import Link from "next/link"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { WORKED_WITH } from "../constants/constants"

function WorkedWith() {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-4">
      {WORKED_WITH.map((company) => (
        <HoverCard key={company.value} openDelay={200} closeDelay={150}>
          <HoverCardTrigger asChild className="group">
            <div className="flex justify-start sm:justify-center h-auto cursor-default p-2.5">
              <company.icon className='object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-105' />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-background" sideOffset={10}>
            <div className="flex flex-col items-start justify-between space-x-4 space-y-1">
              <Link href={company.link} target='_blank' className="text-sm font-semibold text-primary hover:underline">
                @{company.value}
              </Link>
              <p className="text-sm">{company.description}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}

export default WorkedWith
