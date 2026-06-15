import React from "react";

export default function SectionSkeleton() {
  return (
    <div className="w-full py-20 px-6 max-w-7xl mx-auto flex flex-col gap-6 animate-pulse select-none">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 text-center">
        <div className="h-4 w-32 bg-border-color/20 rounded-full" />
        <div className="h-8 w-64 bg-border-color/30 rounded-lg" />
        <div className="h-1 w-16 bg-border-color/20 rounded-full mt-1" />
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-border-color/20 bg-bg-card/40 flex flex-col gap-4"
            style={{ minHeight: "220px" }}
          >
            <div className="w-10 h-10 rounded-xl bg-border-color/25" />
            <div className="h-5 w-2/3 bg-border-color/30 rounded" />
            <div className="space-y-2 mt-2">
              <div className="h-3 w-full bg-border-color/15 rounded" />
              <div className="h-3 w-5/6 bg-border-color/15 rounded" />
              <div className="h-3 w-4/5 bg-border-color/15 rounded" />
            </div>
            <div className="flex-1" />
            <div className="h-8 w-24 bg-border-color/25 rounded-lg mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
