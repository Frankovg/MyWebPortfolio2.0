import { Skeleton } from "../ui/skeleton"
import { AdminInputSkeleton, InputContainerSkeleton } from "./admin-input-skeleton"
import { AdminSectionsWrapperSkeleton, FormWrapperSkeleton, SectionSubGroupSkeleton } from "./admin-sections-wrapper-skeleton"
import { BreadcrumbsSkeleton } from "./breadcrumbs-skeleton"
import { CheckboxSkeleton } from "./checkbox-skeleton"

export const DownloadsFormSkeleton = () => {
  return (
    <>
      <BreadcrumbsSkeleton />
      <AdminSectionsWrapperSkeleton>
        <FormWrapperSkeleton>
          <SectionSubGroupSkeleton>
            <div className="w-full flex justify-between items-center">
              <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
              <CheckboxSkeleton className="group w-1/3" />
            </div>
            <InputContainerSkeleton>
              <AdminInputSkeleton className="lg:w-2/5" />
              <AdminInputSkeleton className="lg:w-2/5" />
              <AdminInputSkeleton className="lg:w-1/5" />
            </InputContainerSkeleton>
            <InputContainerSkeleton>
              <AdminInputSkeleton className="lg:w-1/2" />
              <AdminInputSkeleton className="lg:w-1/2" />
            </InputContainerSkeleton>
            <AdminInputSkeleton />
          </SectionSubGroupSkeleton>
          <Skeleton className="rounded-md w-70 h-10 bg-textAnimation" />
          <Skeleton className="rounded-md w-70 h-10 bg-softGrey" />
        </FormWrapperSkeleton>
      </AdminSectionsWrapperSkeleton>
    </>
  )
}
