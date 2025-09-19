import { Skeleton } from "../ui/skeleton"

export const ContactFormSkeleton = () => {
  return (
    <section className='pt-24 px-4 w-full'>
      <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 mb-16 bg-textAnimation' />
      <div className="w-full pb-24">
        <div className="max-w-contact mx-auto">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="space-y-1 w-full">
                <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
              </div>
              <div className="space-y-1 w-full">
                <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="space-y-1 w-full">
                <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
              </div>
              <div className="space-y-1 w-full">
                <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
              </div>
            </div>
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
              <Skeleton className='rounded-xl w-full h-36 bg-softGrey' />
              <Skeleton className='rounded-xl w-full max-w-[300px] h-2 bg-softGrey' />
            </div>
            <Skeleton className='rounded-xl w-full max-w-[150px] h-12 bg-textAnimation' />
          </div>
        </div>
      </div>
    </section>
  )
}
