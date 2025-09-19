"use client";

import * as React from "react";
import Image from "next/image";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useGlobalStore} from "@/store/useGlobalStore";
import {Category} from "@/types/types";
import MenuItemCard from "@/components/MenuItemCard";
import {useEffect, useState, useRef, useCallback} from "react";
import {fetchDishes} from "@/lib/api";
import {Dish} from "@/types/api";

const LIMIT = 10;

export function CategoryScroll() {
    const categories = useGlobalStore().categories;
    const selectedCategory = useGlobalStore().selectedCategory;
    const setSelectedCategory = useGlobalStore().setSelectedCategory;
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [limit, setLimit] = useState(LIMIT);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Ref cho sentinel element (phần tử trigger load more)
    const sentinelRef = useRef<HTMLDivElement>(null);

    const loadDishes = async (pageNumber: number, isLoadMore = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            setError(null);

            const response = await fetchDishes({
                limit,
                page: pageNumber,
                categoryId: selectedCategory?.id || null
            });

            const newDishes = response.data.result.content;
            const isLastPage = response.data.result.last;

            if (pageNumber === 1) {
                setDishes(newDishes);
            } else {
                setDishes(prev => [...prev, ...newDishes]);
            }

            setHasMore(!isLastPage);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
            setHasMore(false);

        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Load more function
    const loadMore = useCallback(() => {
        if (loading || loadingMore || !hasMore) return;

        const nextPage = page + 1;
        setPage(nextPage);
        loadDishes(nextPage, true);
    }, [loading, loadingMore, hasMore, page]);

    // Intersection Observer cho infinite scroll
    useEffect(() => {
        if (!sentinelRef.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    loadMore();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px' // Trigger 100px trước khi đến sentinel
            }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [loadMore, hasMore]);

    // Load dishes khi selectedCategory thay đổi
    useEffect(() => {
        setPage(1);
        setHasMore(true);
        loadDishes(1, false);
    }, [selectedCategory]);

    const handleCategoryClick = (cat: Category) => {
        setSelectedCategory(cat);
        setError(null);
    };

    const retry = () => {
        setError(null);
        loadDishes(page, false);
    };

    return (
        <div>
            {/* Category scroll */}
            <ScrollArea className="w-full rounded-md border overflow-x-auto bg-white">
                <div className="flex p-4 gap-4">
                    {categories.map((cat, index) => (
                        <button
                            key={cat.id ?? `all-${index}`}
                            className={`flex flex-col items-center shrink-0 w-24 rounded-lg transition-transform focus:outline-none
                            ${selectedCategory?.id === cat.id ? "scale-105 text-green-600" : "hover:scale-105"}`}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            <div className="overflow-hidden rounded-full h-16 w-16">
                                <Image
                                    src={cat.imageUrl || "/pho.webp"}
                                    alt={cat.name}
                                    className="object-cover w-full h-full"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <span className="text-center text-sm font-medium mt-2">
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            {/* Grid layout */}
            <div className="pt-6">
                <div
                    className="grid gap-3 sm:gap-4 auto-rows-fr grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                    {dishes.map((food) => (
                        <MenuItemCard key={food.id} food={food}/>
                    ))}
                </div>

                {/* Sentinel element - invisible trigger cho Intersection Observer */}
                {hasMore && !loading && dishes.length > 0 && (
                    <div ref={sentinelRef} className="h-4 w-full"/>
                )}

                {/* Loading states */}
                {loading && dishes.length === 0 && (
                    <div className="text-center py-12">
                        <div
                            className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        <p className="mt-2 text-gray-500">Đang tải món ăn...</p>
                    </div>
                )}

                {/* Load more spinner */}
                {loadingMore && (
                    <div className="text-center py-6">
                        <div
                            className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                        <span className="ml-2 text-sm text-gray-500">Đang tải thêm...</span>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="text-center py-6">
                        <p className="text-sm text-red-500 mb-2">{error}</p>
                        <button
                            onClick={retry}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {/* End message */}
                {!hasMore && !loading && !loadingMore && dishes.length > 0 && (
                    <div className="text-center py-6">
                        <p className="text-sm text-gray-500">🎉 Bạn đã xem hết tất cả món ăn!</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && dishes.length === 0 && !error && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-gray-500">Không có món ăn nào trong danh mục này</p>
                    </div>
                )}
            </div>
        </div>
    );
}