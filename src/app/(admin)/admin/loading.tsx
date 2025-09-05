import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
      <div className="flex items-center gap-2">
        <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
      </div>
      <div className="flex flex-col-reverse max-1170:gap-4 shrink 1170:flex-row">
        <div className="flex-1 1170:p-2">
          <Skeleton className='rounded-md w-full h-100 bg-textAnimation' />
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center 1170:p-2">
          <Skeleton className='rounded-md w-full h-30 bg-textAnimation' />
          <Skeleton className='rounded-md w-full h-full bg-textAnimation' />
        </div>
      </div>
    </section>
  );
}
