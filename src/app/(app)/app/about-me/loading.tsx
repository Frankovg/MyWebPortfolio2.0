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
        <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 600:mt-24 mb-16 bg-textAnimation' />
        <div className="w-full flex flex-col items-center space-y-6">
          <div className="w-full max-w-am space-y-2">
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
          </div>
          <div className="w-full max-w-am space-y-2">
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-full h-4 bg-softGrey' />
            <Skeleton className='rounded-xl w-2/3 h-4 bg-softGrey' />
          </div>
        </div>
      </>
      <section className='pt-[15vh] px-4 w-full'>
        <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 mb-16 bg-textAnimation' />
        <div className='pb-8 w-full flex flex-col space-y-1.5 items-center'>
          <Skeleton className='rounded-xl w-full max-w-[500px] h-5 bg-softGrey' />
          <Skeleton className='rounded-xl w-full max-w-[450px] h-5 bg-softGrey' />
        </div>
        <Skeleton className='rounded-xl w-full h-90 bg-softGrey' />
      </section>

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
    </div>
  );
}
