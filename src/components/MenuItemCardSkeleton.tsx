"use client";

import {Skeleton} from "@/components/ui/skeleton";

export default function MenuItemCardSkeleton() {
    return (
        <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-sm bg-white dark:bg-gray-800">
            {/* Image skeleton */}
            <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                <Skeleton className="h-full w-full rounded-t-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                {/* Badge giả lập */}
                <Skeleton
                    className="absolute left-2 top-2 h-5 w-12 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse"/>
            </div>

            {/* Nội dung skeleton */}
            <div className="flex flex-col flex-1 p-3">
                {/* Tiêu đề + rating */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <Skeleton className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                    <Skeleton className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>

                {/* Mô tả */}
                <div className="mb-3 flex-1">
                    <Skeleton className="h-4 w-full rounded mb-1 bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                    <Skeleton className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>

                {/* Giá + button */}
                <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex flex-col justify-start items-start flex-1 min-w-0">
                        <Skeleton className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700 animate-pulse mb-1"/>
                        <Skeleton className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                    </div>

                    {/* Nút thêm vào giỏ */}
                    <Skeleton className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
            </div>
        </div>
    );
}
