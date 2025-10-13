import { Skeleton } from "../ui/skeleton"

export const ProjectCarouselSkeleton = () => {
  return (
    <div className="max-600:hidden 1100:col-span-7 col-span-12">
      <div className="w-full">
        <Skeleton className="flex mb-4 h-[53.1vw] 1100:h-[29.1vw] rounded-lg w-full bg-softGrey" />
        <div className="flex -ml-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="rounded-lg w-full h-[12.83vw] 1100:h-[7vw] bg-softGrey ml-4" />
          ))}
        </div>
      </div>
    </div>
  )
}
