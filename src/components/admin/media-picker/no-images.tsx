import { ImageOff } from "@/icons/lucide"

export const NoImages = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
      <ImageOff className="size-10" />
      <p className="text-sm">No images in this folder</p>
    </div>
  )
}
