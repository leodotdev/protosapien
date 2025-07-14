import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full max-w-[1280px] h-screen lg:border-x border-border">
        {/* Sidebar Skeleton - Hidden on mobile */}
        <div className="hidden lg:flex w-64 border-r border-border flex-col">
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
          <div className="border-b border-border flex flex-col gap-6 lg:gap-24">
            <div className="flex items-center justify-between px-7 py-6">
              {/* Mobile: Logo and Nav stacked */}
              <div className="flex flex-col gap-4 lg:hidden">
                <Skeleton className="h-6 w-6" />
                <div className="flex items-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>
              
              {/* Desktop */}
              <div className="hidden lg:flex items-center gap-7">
                <div className="flex items-center gap-7">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-7">
                <Skeleton className="h-6 w-6 lg:hidden" />
                <Skeleton className="h-8 w-8 rounded-full lg:hidden" />
                <div className="hidden lg:flex items-center gap-7">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
                </div>
                <Skeleton className="h-8 w-8 rounded-full hidden lg:block" />
              </div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="px-7 py-6">
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
          
          {/* Mobile Filters Skeleton */}
          <div className="lg:hidden border-b border-border px-7 py-6">
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
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div className="flex-1">
                      <Skeleton className="h-9 w-48 mb-2" />
                      <Skeleton className="h-5 w-full lg:w-96" />
                    </div>
                    <div className="flex items-center gap-2 lg:gap-3">
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