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
          <Skeleton className='rounded-xl w-46 h-4 bg-softGrey' />
        </div>
        <div className="mt-2">
          <Skeleton className="rounded-md w-full h-32 bg-textAnimation" />
        </div>
      </section>
    </>
  );
}
