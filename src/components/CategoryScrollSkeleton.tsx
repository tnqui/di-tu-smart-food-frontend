"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export function CategoryScrollSkeleton() {
    // Mình tạo 6 skeleton category giả lập
    const skeletons = Array(6).fill(0);

    return (
        <ScrollArea className="w-full rounded-md border overflow-x-auto bg-white">
            <div className="flex p-4 space-x-4">
                {skeletons.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center shrink-0 w-24 rounded-lg"
                    >
                        {/* Hình tròn skeleton */}
                        <Skeleton className="rounded-full h-16 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                        {/* Text skeleton */}
                        <Skeleton className="h-4 w-16 mt-2 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    );
}
