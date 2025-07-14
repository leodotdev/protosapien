import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full max-w-[1280px] h-screen md:border-x border-border">
        {/* Sidebar Skeleton - Hidden on mobile */}
        <div className="hidden md:flex w-64 border-r border-border flex-col">
          <div className="flex flex-col gap-24">
            <div className="px-7 py-6">
              <div className="p-1">
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
            <div className="px-7 py-6 border-b border-border">
              <Skeleton className="h-9 w-20" />
            </div>
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
          <div className="border-b border-border flex flex-col gap-6 md:gap-24">
            <div className="flex items-center justify-between px-4 md:px-7 py-4 md:py-6">
              {/* Mobile: Logo and Nav stacked */}
              <div className="flex flex-col gap-4 md:hidden">
                <Skeleton className="h-6 w-6" />
                <div className="flex items-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>
              
              {/* Desktop */}
              <div className="hidden md:flex items-center gap-7">
                <div className="flex items-center gap-7">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-7">
                <Skeleton className="h-6 w-12 md:hidden" />
                <div className="hidden md:flex items-center gap-7">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="px-4 md:px-7 py-4 md:py-6">
              <Skeleton className="h-8 md:h-9 w-24 md:w-32" />
            </div>
          </div>
          
          {/* Mobile Filters Skeleton */}
          <div className="md:hidden border-b border-border px-4 py-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-7 w-20 flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Tasks List Skeleton */}
          <div className="flex-1 overflow-hidden">
            <div>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`px-4 md:px-7 py-4 md:py-6 ${
                    i !== 6 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex-1">
                      <Skeleton className="h-7 md:h-9 w-48 mb-2" />
                      <Skeleton className="h-5 w-full md:w-96" />
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
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