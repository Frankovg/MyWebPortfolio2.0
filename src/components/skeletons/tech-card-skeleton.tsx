import { Skeleton } from "../ui/skeleton"

export const TechCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="w-24 h-24 rounded-full bg-textAnimation" />
      <Skeleton className="mt-2 w-16 h-3 rounded-md bg-textAnimation" />
    </div>
  )
}
