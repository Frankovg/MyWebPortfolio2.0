import clsx from "clsx"
import { Skeleton } from "../ui/skeleton"

export const AdminInputSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("relative flex flex-col gap-2 w-full", className)}>
      <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
      <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
    </div>
  )
}

export const InputContainerSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {children}
    </div>
  )
}
