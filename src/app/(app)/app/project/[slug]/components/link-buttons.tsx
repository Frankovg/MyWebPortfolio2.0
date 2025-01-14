import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

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
          className="w-1/3"
        >
          <Button
            className="w-full mx-1 text-lg font-semibold"
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