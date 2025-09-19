import { ContactFormSkeleton } from "@/components/skeletons/contact-form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row [&_section]:pt-0">
      <section className='pt-24 px-4 w-full'>
        <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 mb-16 bg-textAnimation' />
        <div className="p-2.5 w-full">
          <Skeleton className='rounded-xl w-full max-w-[200px] h-6 bg-softGrey' />
          <div className="py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-textAnimation" />
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
              <Skeleton className='rounded-xl w-[150px] h-5 bg-softGrey' />
            </div>
          </div>
          <div className="py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-textAnimation" />
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
              <Skeleton className='rounded-xl w-[150px] h-5 bg-softGrey' />
            </div>
          </div>
          <div className="py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-textAnimation" />
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
              <Skeleton className='rounded-xl w-[150px] h-5 bg-softGrey' />
            </div>
          </div>
          <Skeleton className="border-b border-softGrey w-full max-w-[450px] mt-6" />
          <Skeleton className='rounded-xl w-full max-w-[200px] h-6 bg-softGrey mt-6' />
          <div className="py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-textAnimation" />
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
              <Skeleton className='rounded-xl w-[150px] h-5 bg-softGrey' />
            </div>
          </div>
          <div className="py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-textAnimation" />
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
              <Skeleton className='rounded-xl w-[150px] h-5 bg-softGrey' />
            </div>
          </div>
          <div className="py-2 flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-textAnimation" />
            <div className="space-y-1">
              <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
              <Skeleton className='rounded-xl w-[150px] h-5 bg-softGrey' />
            </div>
          </div>
        </div>
      </section>
      <ContactFormSkeleton />
    </div>
  );
}
