"use client";

import {useGlobalStore} from "@/store/useGlobalStore";
import {CategoryScroll} from "@/components/CategoryScroll";
import {CategoryScrollSkeleton} from "@/components/CategoryScrollSkeleton";


export default function Menu() {

    const {categories} = useGlobalStore();

    const showSkeletonForCategory = categories.length === 0;

    return (
        <div className="overflow-x-auto">
            <div>
                {showSkeletonForCategory ? <CategoryScrollSkeleton/> : <CategoryScroll/>}
            </div>
        </div>
    );
}
