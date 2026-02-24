"use client";

import { cn } from "@/lib/utils";

// Base Skeleton Primitive
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-white/5", className)} />
  );
}

// Table Skeleton (Jo missing tha)
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-4 p-10 max-w-7xl mx-auto">
      <Skeleton className="h-12 w-1/3 mb-10" /> {/* Title placeholder */}
      <Skeleton className="h-40 w-full rounded-xl" /> {/* Banner placeholder */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Header/Hero Skeleton
export function HeaderSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-10">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}