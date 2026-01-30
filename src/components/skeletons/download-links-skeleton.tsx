import { Skeleton } from "../ui/skeleton";

export function DownloadLinksSkeleton() {
  return (
    <div className="flex max-sm:flex-wrap gap-4 items-center max-sm:justify-end w-full sm:w-max h-auto p-4">
      <Skeleton className="w-34 h-24 sm:w-[200px] sm:h-[133px] rounded-md bg-textAnimation" />
      <Skeleton className="w-34 h-24 sm:w-[200px] sm:h-[133px] rounded-md bg-textAnimation" />
    </div>
  );
}
