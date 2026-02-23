import { SectionTitleSkeleton } from "@/components/skeletons/admin-sections-wrapper-skeleton";
import { BreadcrumbsSkeleton } from "@/components/skeletons/breadcrumbs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
        <SectionTitleSkeleton />
        <div className="mt-2">
          <Skeleton className="rounded-md w-full h-32 bg-textAnimation" />
        </div>
      </section>
    </>
  );
}
