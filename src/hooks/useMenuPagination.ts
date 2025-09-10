import { useState, useCallback, useRef, useEffect } from 'react';
import { dishService } from '@/services/DishService';
import { useDishesStore } from '@/store/useDishesStore';
import { Dish } from "@/types/api";

interface UseMenuPaginationReturn {
    dishes: Dish[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    fetchMore: () => Promise<void>;
    retry: () => Promise<void>;
    refresh: () => Promise<void>;
}

export function useMenuPagination(categoryId?: number): UseMenuPaginationReturn {
    const { dishesByCategory, setDishesForCategory } = useDishesStore();

    const categoryKey = categoryId?.toString() || 'all';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchDishes = useCallback(async (isRefresh = false) => {
        if (loadingRef.current) return;

        // ✅ Get fresh data from store every time
        const currentData = dishesByCategory[categoryKey] || {
            dishes: [],
            page: 0, // Server pages start from 0
            totalPages: 0,
        };

        const targetPage = isRefresh ? 0 : currentData.page + 1;

        // ✅ Fixed hasMore logic
        if (!isRefresh && currentData.totalPages > 0 && currentData.page >= currentData.totalPages) {
            setHasMore(false);
            return;
        }

        // ✅ Cancel previous request if exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        loadingRef.current = true;
        setLoading(true);
        setError(null);

        try {
            const response = await dishService.getDishes({
                page: targetPage,
                size: 10,
                categoryId,
            }, signal); // Pass abort signal if your service supports it

            // ✅ Check if request was cancelled
            if (signal.aborted) return;

            const newDishes = response.result.content;
            const existingIds = new Set(currentData.dishes.map(d => d.id));
            const filteredDishes = newDishes.filter(dish => !existingIds.has(dish.id));

            // ✅ Better duplicate detection
            if (filteredDishes.length === 0 && !isRefresh && newDishes.length > 0) {
                console.warn('No new dishes received, might be duplicate request');
                setHasMore(false);
                return;
            }

            const updatedDishes = isRefresh
                ? filteredDishes
                : [...currentData.dishes, ...filteredDishes];

            const newPage = response.result.pageable.pageNumber; // Keep server page as is
            const newTotalPages = response.result.totalPages;

            // ✅ Fixed hasMore calculation
            setHasMore(newPage < newTotalPages - 1);

            // Update dishes in store
            setDishesForCategory(categoryKey, {
                dishes: updatedDishes,
                page: newPage,
                totalPages: newTotalPages,
            });

        } catch (err) {
            // ✅ Ignore cancelled requests
            if (err instanceof Error && err.name === 'AbortError') {
                return;
            }

            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải món ăn';
            setError(errorMessage);
            console.error('Failed to fetch dishes:', err);
        } finally {
            loadingRef.current = false;
            setLoading(false);
            abortControllerRef.current = null;
        }
    }, [categoryId, dishesByCategory, setDishesForCategory, categoryKey]);

    const fetchMore = useCallback(() => fetchDishes(false), [fetchDishes]);
    const retry = useCallback(() => fetchDishes(false), [fetchDishes]);
    const refresh = useCallback(() => fetchDishes(true), [fetchDishes]);

    // ✅ Initial load when category changes or no data
    useEffect(() => {
        const currentData = dishesByCategory[categoryKey] || { dishes: [], page: -1 };
        if (currentData.dishes.length === 0 && !loadingRef.current) {
            fetchDishes(false);
        }
    }, [categoryId, categoryKey, fetchDishes]);

    // ✅ Update hasMore when category data changes
    useEffect(() => {
        const currentData = dishesByCategory[categoryKey];
        if (currentData && currentData.totalPages > 0) {
            // Use the fact that page starts from 0, so last page is totalPages - 1
            const isOnLastPage = currentData.page >= currentData.totalPages - 1;
            setHasMore(!isOnLastPage);
        } else {
            setHasMore(true); // Default to true when no data
        }
    }, [categoryKey, dishesByCategory]);

    // ✅ Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const currentData = dishesByCategory[categoryKey] || { dishes: [] };

    return {
        dishes: currentData.dishes,
        loading,
        error,
        hasMore,
        fetchMore,
        retry,
        refresh,
    };
}