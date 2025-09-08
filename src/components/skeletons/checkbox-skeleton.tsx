import clsx from "clsx"

import { Skeleton } from "../ui/skeleton"

export const CheckboxSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex items-center justify-end space-x-2", className)}>
      <Skeleton className="rounded-md w-4 h-4 bg-softGrey" />
      <Skeleton className="rounded-md w-32 h-4 bg-softGrey" />
    </div>
  )
}
