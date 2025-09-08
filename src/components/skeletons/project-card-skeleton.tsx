import { Skeleton } from "../ui/skeleton"

export const ProjectCardSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden p-2 rounded-sm"    >
      <div className="w-full">
        <Skeleton className='rounded-xl w-full h-full min-h-[250px] bg-textAnimation' />
      </div >
      <div className="w-full h-full px-6 py-4">
        <Skeleton className='rounded-xl w-full max-w-[200px] h-5 mb-2 bg-textAnimation' />
        <Skeleton className='rounded-xl w-full h-4 bg-softGrey mb-2' />
        <Skeleton className='rounded-xl w-full h-4 bg-softGrey mb-2' />
        <Skeleton className='rounded-xl w-full h-4 bg-softGrey mb-2' />
        <Skeleton className='rounded-xl w-full h-4 bg-softGrey mb-2' />
      </div>
      <div className="w-full mt-2.5 mb-1">
        <Skeleton className='rounded-xl w-full max-w-[300px] h-2 bg-textAnimation mx-auto' />
      </div>
    </div >
  )
}
