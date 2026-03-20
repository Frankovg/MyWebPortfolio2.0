import { SectionTitleSkeleton } from "@/components/skeletons/admin-sections-wrapper-skeleton";
import { BreadcrumbsSkeleton } from "@/components/skeletons/breadcrumbs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
        <SectionTitleSkeleton />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-64 rounded-md bg-textAnimation" />
          <Skeleton className="h-9 w-24 rounded-md bg-textAnimation" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-md bg-textAnimation" />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-square rounded-lg bg-textAnimation"
            />
          ))}
        </div>
      </section>
    </>
  );
}
