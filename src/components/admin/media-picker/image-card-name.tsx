import { Badge } from "@/components/ui/badge"

type ImageCardNameProps = {
  name: string,
  format: string
}

export const ImageCardName = ({ name, format }: ImageCardNameProps) => {
  return (
    <div className="p-2 flex items-center justify-between gap-2">
      <span className="text-xs truncate" title={name}>
        {name}
      </span>
      <Badge variant="outline" className="text-[10px] shrink-0">
        {format}
      </Badge>
    </div>
  )
}
