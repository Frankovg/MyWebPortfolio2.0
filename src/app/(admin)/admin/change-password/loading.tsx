import { AdminInputSkeleton, InputContainerSkeleton } from "@/components/skeletons/admin-input-skeleton";
import { AdminSectionsWrapperSkeleton, FormWrapperSkeleton, SectionSubGroupSkeleton } from "@/components/skeletons/admin-sections-wrapper-skeleton";
import { BreadcrumbsSkeleton } from "@/components/skeletons/breadcrumbs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <AdminSectionsWrapperSkeleton>
        <FormWrapperSkeleton>
          <SectionSubGroupSkeleton>
            <InputContainerSkeleton>
              <AdminInputSkeleton className="lg:w-2/5" />
              <AdminInputSkeleton className="lg:w-2/5" />
              <AdminInputSkeleton className="lg:w-2/5" />
            </InputContainerSkeleton>
          </SectionSubGroupSkeleton>
          <Skeleton className="rounded-md w-70 h-10 bg-textAnimation" />
        </FormWrapperSkeleton>
      </AdminSectionsWrapperSkeleton>
    </>
  );
}
