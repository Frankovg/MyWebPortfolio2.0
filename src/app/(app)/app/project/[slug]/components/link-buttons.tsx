import { Play } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

type LinkButtonsProps = {
  data: {
    name: string
    url: string
  }[]
}

function LinkButtons({ data }: LinkButtonsProps) {
  return (
    <>
      {data.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Button
            className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
            variant="secondary"
            size="default"
          >
            <Play className="w-4 h-4 mr-2" /> {item.name}
          </Button>
        </Link>
      ))}
    </ >
  )
}

export default LinkButtons