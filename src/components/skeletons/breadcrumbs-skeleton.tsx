import { Skeleton } from "../ui/skeleton"

export const BreadcrumbsSkeleton = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-2 px-4">
      <Skeleton className='-ml-1 rounded-xl w-6 h-6 bg-softGrey' />
      <Skeleton className='rounded-xl w-32 h-4 bg-softGrey' />
    </header>
  )
}
