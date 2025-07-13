import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full max-w-[1280px] h-screen border-x border-border">
        {/* Sidebar Skeleton */}
        <div className="w-64 border-r border-border">
          <div className="px-7 py-6 border-b border-border h-[358px] flex flex-col justify-between">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-9 w-20" />
          </div>
          <div className="px-7 py-6">
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-5 w-24" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col">
          {/* Header Skeleton */}
          <div className="border-b border-border flex flex-col">
            <div className="flex items-center justify-between px-7 py-6">
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-7">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-7">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="flex-1 relative px-7 py-6">
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          {/* Tasks List Skeleton */}
          <div className="flex-1 overflow-hidden">
            <div>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`px-7 py-6 ${
                    i !== 6 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Skeleton className="h-9 w-48 mb-2" />
                      <Skeleton className="h-5 w-96" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-6 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}