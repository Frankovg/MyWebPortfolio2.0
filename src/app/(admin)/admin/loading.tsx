import { SectionTitleSkeleton } from "@/components/skeletons/admin-sections-wrapper-skeleton";
import { BreadcrumbsSkeleton } from "@/components/skeletons/breadcrumbs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
        <SectionTitleSkeleton />
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
    </>
  );
}
