import { Skeleton } from "../ui/skeleton"

export const SectionTitleSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className='rounded-xl w-[100px] h-4 bg-softGrey' />
    </div>
  )
}

export const AdminSectionsWrapperSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
      <SectionTitleSkeleton />
      <div className="relative flex flex-wrap gap-6">
        {children}
      </div>
    </section>
  )
}

export const FormWrapperSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
      {children}
    </div>
  )
}

export const SectionSubGroupSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 pt-4 pb-8 w-full space-y-6">
      {children}
    </div>
  )
}
