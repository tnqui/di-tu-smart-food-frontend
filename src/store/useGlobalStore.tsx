import {Category, DeliveryMethods} from "@/types/types";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {fetchCategories, fetchDeliveryMethods} from "@/lib/api";


const ALL_CATEGORY: Category = {
    id: null,
    name: "Tất cả",
    imageUrl: "/pho.webp",
};


type GlobalState = {
    categories: Category[];
    deliveryMethods: DeliveryMethods[];
    selectedCategory: Category | null;
    setCategories: (categories: Category[]) => void;
    setDeliveryMethods: (deliveries: DeliveryMethods[]) => void;
    setSelectedCategory: (category: Category | null) => void;
    fetchInitialData: () => void;
    reset: () => void;
};


export const useGlobalStore = create<GlobalState>()(
    persist(
        (set, get) => ({
            categories: [],
            deliveryMethods: [],
            selectedCategory: null,

            setCategories: (categories) => {
                const categoriesWithAll = [ALL_CATEGORY, ...categories];

                const currentSelected = get().selectedCategory;
                const selectedCategory = currentSelected || ALL_CATEGORY;

                set({
                    categories: categoriesWithAll,
                    selectedCategory
                });
            },

            setDeliveryMethods: (deliveryMethods) => set({deliveryMethods}),

            setSelectedCategory: (selectedCategory) => set({selectedCategory}),

            fetchInitialData: async () => {
                try {
                    const [catRes, delRes] = await Promise.all([
                        fetchCategories(),
                        fetchDeliveryMethods(),
                    ]);

                    // Sử dụng setCategories để tự động thêm "Tất cả"
                    const state = get();
                    state.setCategories(catRes.data.result);

                    set({
                        deliveryMethods: delRes.data.result,
                    });
                } catch (err) {
                    console.error('Error fetching initial data:', err);
                }
            },

            reset: () => set({
                categories: [],
                deliveryMethods: [],
                selectedCategory: null
            }),
        }),
        {
            name: "global-storage",
        }
    )
);