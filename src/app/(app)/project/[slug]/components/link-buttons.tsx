import { Play } from "lucide-react"

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
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="w-fit min-w-40 mx-1 text-lg font-semibold text-white"
            variant="secondary"
            size="default"
          >
            <Play className="w-4 h-4 mr-2" />
            {item.name}
          </Button>
        </a>
      ))}
    </>
  )
}

export default LinkButtons
