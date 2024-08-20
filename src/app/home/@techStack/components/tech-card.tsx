import Link from "next/link";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

type TechCardProps = {
  tech: {
    name: string;
    value: string;
    icon: string;
    description: string;
    link: string;
  },
  className?: string
}

function TechCard({ tech, className = '' }: TechCardProps) {
  return (
    <HoverCard key={tech.name}>
      <HoverCardTrigger asChild>
        <Button variant={"ghost"} className="flex justify-center h-auto">
          <Image
            key={tech.name}
            src={tech.icon}
            alt={`${tech.name} logo`}
            id={tech.name}
            className={className}
            width={85}
            height={85}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-background" sideOffset={2}>
        <div className="flex flex-col items-start justify-between space-x-4 space-y-1">
          <Link href={tech.link} target='_blank' >
            <Button variant="link" className="text-sm font-semibold">@{tech.value}</Button>
          </Link>
          <p className="text-sm">{tech.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default TechCard