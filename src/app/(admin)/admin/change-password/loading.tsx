import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-2 px-4">
        <Skeleton className='-ml-1 rounded-xl w-6 h-6 bg-softGrey' />
        <Skeleton className='rounded-xl w-32 h-4 bg-softGrey' />
      </header>
      <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
        <div className="flex items-center gap-2">
          <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
        </div>
        <div className="relative flex flex-wrap gap-6">
          <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
            <div className="px-6 pt-4 pb-8 w-full space-y-6">
              <div className="w-full flex flex-col lg:flex-row gap-6">
                <div className="relative flex flex-col gap-2 w-full lg:w-2/5">
                  <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                  <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                </div>
                <div className="relative flex flex-col gap-2 w-full lg:w-2/5">
                  <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                  <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                </div>
                <div className="relative flex flex-col gap-2 w-full lg:w-2/5">
                  <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                  <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                </div>
              </div>
            </div>
            <Skeleton className="rounded-md w-70 h-10 bg-textAnimation" />
          </div>
        </div>
      </section>
    </>
  );
}
