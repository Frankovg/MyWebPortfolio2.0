import { Skeleton } from "@/components/ui/skeleton";

export function MediaLibrarySkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-16 rounded-md bg-textAnimation" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-md bg-textAnimation" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden"
          >
            <Skeleton className="aspect-square bg-textAnimation" />
            <div className="p-2 flex items-center justify-between gap-2">
              <Skeleton className="h-3 w-3/4 bg-textAnimation" />
              <Skeleton className="h-4 w-8 rounded-sm bg-textAnimation" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
