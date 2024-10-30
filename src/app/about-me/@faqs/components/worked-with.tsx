import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { WORKED_WITH } from "@/lib/constants"
import Link from "next/link"

function WorkedWith() {
  return (
    <div className="w-full flex flex-wrap justify-between items-center p-4">
      {WORKED_WITH.map((company) => (
        <HoverCard key={company.value} openDelay={200} closeDelay={150}>
          <HoverCardTrigger asChild>
            <Button variant={"ghost"} className="flex justify-center h-auto cursor-default p-2.5">
              <company.icon className='object-contain transition-all duration-300 ease-in-out hover:fill-primary hover:scale-105' />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-background" sideOffset={10}>
            <div className="flex flex-col items-start justify-between space-x-4 space-y-1">
              <Link href={company.link} target='_blank' >
                <Button variant="link" className="text-sm font-semibold">@{company.value}</Button>
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