"use client";

import {useGlobalStore} from "@/store/useGlobalStore";
import {CategoryScroll} from "@/components/CategoryScroll";
import {CategoryScrollSkeleton} from "@/components/CategoryScrollSkeleton";


export default function Menu() {
    const {categories} = useGlobalStore();
    const showSkeletonForCategory = categories.length === 0;

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category scroll */}
            <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="px-4 sm:px-6 lg:px-8">
                    {showSkeletonForCategory ? <CategoryScrollSkeleton/> : <CategoryScroll/>}
                </div>
            </div>
            {/*<CartButton/>*/}
        </div>
    );
}
