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
          <div className="px-6 pt-4 pb-8 w-full space-y-6">
            <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-1/3">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <div className="flex flex-col justify-end items-start gap-2 w-full lg:w-1/3 mb-4">
                <div className="flex items-center justify-end space-x-2">
                  <Skeleton className="rounded-md w-4 h-4 bg-softGrey" />
                  <Skeleton className="rounded-md w-32 h-4 bg-softGrey" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="relative flex flex-col gap-2 w-full xl:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-34 bg-softGrey' />
              </div>
              <div className="relative flex flex-col gap-2 w-full xl:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-34 bg-softGrey' />
              </div>
            </div>
          </div>
          <div className="px-6 pt-4 pb-8 w-full space-y-6">
            <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
            <ul className="w-full space-y-12 lg:space-y-6">
              <li className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full">
                <div className="w-full flex flex-col lg:flex-row lg:items-end gap-6">
                  <div className="relative w-full flex flex-col gap-2">
                    <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                    <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                    <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                    <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                  </div>
                  <Skeleton className="rounded-m h-10 bg-softGrey w-full lg:w-40" />
                </div>
              </li>
            </ul>
            <div className="w-full flex justify-center items-center">
              <Skeleton className="rounded-m w-16 h-16 bg-softGrey" />
            </div>
          </div>
          <div className="px-6 pt-4 pb-8 w-full space-y-6">
            <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
            <div className="relative flex flex-col gap-2">
              <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
              <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
            </div>
          </div>
          <div className="px-6 pt-4 pb-8 w-full space-y-6">
            <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
            <ul className="w-full space-y-12 lg:space-y-6">
              <li className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full">
                <div className="relative w-full flex flex-col gap-2">
                  <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                  <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                </div>
                <div className="relative w-full flex flex-col gap-2">
                  <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                  <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                </div>
                <div className="relative w-full flex flex-col gap-2 max-w-18">
                  <Skeleton className='rounded-md w-10 h-2 bg-softGrey' />
                  <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
                </div>
                <Skeleton className="rounded-m h-10 bg-softGrey w-full lg:w-40" />
              </li>
            </ul>
            <div className="w-full flex justify-center items-center">
              <Skeleton className="rounded-m w-16 h-16 bg-softGrey" />
            </div>
          </div>
          <div className="px-6 pt-4 pb-8 w-full space-y-6">
            <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
            </div>
          </div>
          <div className="px-6 pt-4 pb-8 w-full space-y-6">
            <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
            <div className="relative flex flex-col gap-2">
              <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
              <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
            </div>
            <div className="relative flex flex-col gap-2">
              <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
              <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
                <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
            </div>
            <div className="relative flex flex-col gap-2">
              <Skeleton className='rounded-md w-22 h-2 bg-softGrey' />
              <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
            <Skeleton className="rounded-md w-70 h-10 bg-textAnimation" />
            <Skeleton className="rounded-md w-70 h-10 bg-softGrey" />
          </div>
        </div>
      </section>
    </>
  );
}
