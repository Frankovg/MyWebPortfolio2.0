import { SectionTitleSkeleton } from "@/components/skeletons/admin-sections-wrapper-skeleton";
import { BreadcrumbsSkeleton } from "@/components/skeletons/breadcrumbs-skeleton";
import { CheckboxSkeleton } from "@/components/skeletons/checkbox-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
        <SectionTitleSkeleton />
        <div className="w-full flex space-x-2">
          <Skeleton className='rounded-md w-1/3 h-10 bg-textAnimation' />
          <Skeleton className='rounded-md w-1/3 h-10 bg-softGrey' />
          <Skeleton className='rounded-md w-1/3 h-10 bg-softGrey' />
        </div>
        <div className="mt-2">
          <div className="w-full flex justify-between gap-2 min-md:max-lg:flex-col min-md:max-lg:gap-5 min-md:max-lg:items-center max-600:flex-col max-600:gap-5 max-600:items-center mt-10 pb-2 group">
            <Skeleton className="rounded-md w-1/3 h-10 bg-softGrey max-600:w-full min-md:max-lg:w-full" />
            <CheckboxSkeleton className="group w-1/3" />
            <div className="w-1/3 flex justify-end">
              <Skeleton className="rounded-md w-40 h-10 bg-softGrey" />
            </div>
          </div>
          <div className="mt-2">
            <Skeleton className="rounded-md w-full h-100 bg-textAnimation" />
          </div>
        </div>
      </section>
    </>
  );
}
