'use client'

import Link from "next/link";
import { JSX, SVGProps } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type TechCardProps = {
  tech: {
    name: string;
    value: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    description: string;
    link: string;
  },
  className?: string
}

function TechCard({ tech, className = '' }: TechCardProps) {
  return (
    <HoverCard key={tech.name} openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild className="group">
        <div className="flex justify-center h-auto cursor-default p-0">
          <tech.icon className={className} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-background" sideOffset={10}>
        <div className="flex flex-col items-start justify-between space-x-4 space-y-1">
          <Link href={tech.link} target='_blank' className="text-sm font-semibold text-primary hover:underline" >
            @{tech.value}
          </Link>
          <p className="text-sm">{tech.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default TechCard
