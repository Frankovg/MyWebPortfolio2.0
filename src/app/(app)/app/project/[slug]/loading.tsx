import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full px-4">
      <section className="w-full h-[35vh] md:h-[27.55vw] pb-14 max-600:hidden">
        <div className="w-full h-full">
          <Skeleton className='rounded-xl w-full h-full bg-softGrey' />
        </div>
      </section>

      <>
        <Skeleton className='mx-auto rounded-xl w-full max-w-[500px] h-12 mt-8 600:mt-24 mb-16 bg-textAnimation' />
        <section className="w-full grid grid-cols-12 grid-flow-row gap-0 mb-12">
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
          <div className="1100:col-start-8 1100:col-span-5 1100:ml-8 col-span-12 600:max-1100:mt-24 space-y-6">
            <div className="flex flex-col space-y-1.5 px-6 pb-6 pt-0 max-600:px-0">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className='rounded-xl w-full max-w-[200px] h-4 bg-softGrey' />
              ))}
            </div>
            <div className="600:p-6 600:pt-0 max-600:px-0 space-y-6">
              <div className="max-w-[500px] space-y-2">
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
              </div>
              <div className="max-w-[500px] space-y-2">
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
              </div>
              <div className="max-w-[500px] space-y-2">
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
              </div>
              <div className="max-w-[500px] space-y-2">
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
              </div>
            </div>
            <div className="flex items-center p-6 pt-0 gap-4 max-600:px-0">
              <Skeleton className='rounded-xl w-full max-w-40 h-12 mx-1 bg-textAnimation' />
              <Skeleton className='rounded-xl w-full max-w-40 h-12 mx-1 bg-textAnimation' />
            </div>
          </div>
          <div className="600:hidden 1100:col-span-7 col-span-12 mt-24">
            <div className="w-full h-auto flex flex-col gap-12">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <Skeleton className="rounded-lg w-full h-[51.12vw] bg-softGrey" />
                  <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                  <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
                  <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
      <div className="600:my-16 w-full">
        <div className="w-full flex flex-col 930:flex-row items-top p-0">
          <div className="w-full 930:w-1/2 ">
            <div className="flex flex-col space-y-1.5 max-600:mx-0 m-6">
              <Skeleton className='rounded-xl w-[200px] h-4 bg-textAnimation' />
              <Skeleton className='rounded-xl w-[250px] h-2.5 bg-softGrey' />
            </div>
            <div className="600:m-6 600:mt-0 min-h-[200px] w-full">
              {/* //TODO: hacer chart lineal text + caja uno arriba de otro */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
