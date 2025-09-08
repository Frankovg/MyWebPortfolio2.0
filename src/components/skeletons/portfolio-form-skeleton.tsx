import { Skeleton } from "../ui/skeleton"

import { AdminInputSkeleton, InputContainerSkeleton } from "./admin-input-skeleton"
import { AdminSectionsWrapperSkeleton, SectionSubGroupSkeleton } from "./admin-sections-wrapper-skeleton"
import { BreadcrumbsSkeleton } from "./breadcrumbs-skeleton"
import { CheckboxSkeleton } from "./checkbox-skeleton"

export const PortfolioFormSkeleton = () => {
  return (
    <>
      <BreadcrumbsSkeleton />
      <AdminSectionsWrapperSkeleton>
        <SectionSubGroupSkeleton>
          <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
          <InputContainerSkeleton>
            <AdminInputSkeleton className="lg:w-1/2" />
            <AdminInputSkeleton className="lg:w-1/2" />
          </InputContainerSkeleton>
          <InputContainerSkeleton>
            <AdminInputSkeleton className="lg:w-1/3" />
            <AdminInputSkeleton className="lg:w-1/3" />
            <div className="flex flex-col justify-end items-start gap-2 w-full lg:w-1/3 mb-4">
              <CheckboxSkeleton />
            </div>
          </InputContainerSkeleton>
          <InputContainerSkeleton>
            <AdminInputSkeleton className="xl:w-1/2" />
            <AdminInputSkeleton className="xl:w-1/2" />
          </InputContainerSkeleton>
        </SectionSubGroupSkeleton>
        <SectionSubGroupSkeleton>
          <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
          <ul className="w-full space-y-12 lg:space-y-6">
            <li className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full">
              <div className="w-full flex flex-col lg:flex-row lg:items-end gap-6">
                <AdminInputSkeleton />
                <AdminInputSkeleton />
                <AdminInputSkeleton />
                <Skeleton className="rounded-m h-10 bg-softGrey w-full lg:w-40" />
              </div>
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Skeleton className="rounded-m w-16 h-16 bg-softGrey" />
          </div>
        </SectionSubGroupSkeleton>
        <SectionSubGroupSkeleton>
          <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
          <AdminInputSkeleton />
        </SectionSubGroupSkeleton>
        <SectionSubGroupSkeleton>
          <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
          <ul className="w-full space-y-12 lg:space-y-6">
            <li className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full">
              <AdminInputSkeleton />
              <AdminInputSkeleton />
              <div className="relative w-full flex flex-col gap-2 max-w-18">
                <Skeleton className='rounded-md w-10 h-2 bg-softGrey' />
                <Skeleton className='rounded-md w-full h-10 bg-softGrey' />
              </div>
              <Skeleton className="rounded-m h-10 bg-softGrey w-full lg:w-40" />
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Skeleton className="rounded-m w-16 h-16 bg-softGrey" />
          </div>
        </SectionSubGroupSkeleton>
        <SectionSubGroupSkeleton>
          <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
          <InputContainerSkeleton>
            <AdminInputSkeleton className="lg:w-1/2" />
            <AdminInputSkeleton className="lg:w-1/2" />
          </InputContainerSkeleton>
          <InputContainerSkeleton>
            <AdminInputSkeleton className="lg:w-1/2" />
            <AdminInputSkeleton className="lg:w-1/2" />
          </InputContainerSkeleton>
        </SectionSubGroupSkeleton>
        <SectionSubGroupSkeleton>
          <Skeleton className='rounded-xl w-36 h-8 bg-softGrey' />
          <AdminInputSkeleton />
          <AdminInputSkeleton />
          <InputContainerSkeleton>
            <AdminInputSkeleton className="lg:w-1/2" />
            <AdminInputSkeleton className="lg:w-1/2" />
          </InputContainerSkeleton>
          <AdminInputSkeleton />
        </SectionSubGroupSkeleton>
        <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
          <Skeleton className="rounded-md w-70 h-10 bg-textAnimation" />
          <Skeleton className="rounded-md w-70 h-10 bg-softGrey" />
        </div>
      </AdminSectionsWrapperSkeleton>
    </>
  )
}
