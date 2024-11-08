import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { COMPANY_CLIENTS } from "../constants/constants";

function CompanyClients() {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-4">
      {COMPANY_CLIENTS.map((brand) => (
        <HoverCard key={brand.value} openDelay={200} closeDelay={150}>
          <HoverCardTrigger asChild className="group">
            <Button variant={"ghost"} className="flex justify-center h-auto cursor-default p-2.5">
              <brand.icon className='object-contain transition-all duration-200 ease-in-out group-hover:fill-primary group-hover:scale-105' />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-background" sideOffset={10}>
            <div className="flex flex-col items-start justify-between space-x-4 space-y-1">
              <Link href={brand.link} target='_blank' >
                <Button variant="link" className="text-sm font-semibold">@{brand.value}</Button>
              </Link>
              <p className="text-sm">{brand.description}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}

export default CompanyClients;