"use client";

import * as React from "react";
import Image from "next/image";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {useGlobalStore} from "@/store/useGlobalStore";
import {Category} from "@/types/types";
import MenuItemCard from "@/components/MenuItemCard";
import {useEffect, useState} from "react";
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

    const pageable = {limit, page}

    const retry = () => {
        setError(null);
    };

    useEffect(() => {
        const loadDishes = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchDishes({
                    ...pageable,
                    categoryId: selectedCategory?.id || null
                });
                setDishes(response.data.result.content);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        };

        loadDishes();
    }, [selectedCategory, page, limit]);

    const handleCategoryClick = (cat: Category) => {
        setSelectedCategory(cat);
        setPage(1); // Reset về trang 1 khi đổi category
    };


    return (
        <div>
            <ScrollArea className="w-full rounded-md border overflow-x-auto bg-white">
                <div className="flex p-4">
                    {categories.map((cat, index) => (
                        <button
                            key={cat.id ?? `all-${index}`} // nếu id là null, dùng fallback key
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
            <div
                className="grid gap-3 sm:gap-4 auto-rows-fr grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                {dishes.map((food) => (
                    <MenuItemCard key={food.id} food={food}/>
                ))}
            </div>
            {error && dishes.length > 0 && (
                <div className="text-center py-4">
                    <p className="text-sm text-red-500 mb-2">{error}</p>
                    <button
                        onClick={retry}
                        className="text-sm text-primary hover:underline"
                    >
                        Thử tải lại
                    </button>
                </div>
            )}
        </div>
    );
}
