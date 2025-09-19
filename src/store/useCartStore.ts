import {create} from "zustand";
import {persist} from "zustand/middleware";
import {CartItem, Dish} from "@/types/api";

type CartState = {
    cart: CartItem[];
    isHydrated: boolean;
    setHydrated: (value: boolean) => void;
    addToCart: (dish: Dish, quantity: number) => void;
    removeFromCart: (dishId: number) => void;
    clearCart: () => void;
    updateQuantity: (dishId: number, change: number) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            isHydrated: false,
            setHydrated: (value) => set({isHydrated: value}),
            addToCart: (dish, quantity) =>
                set((state) => {
                    const existing = state.cart.find((item) => item.dish.id === dish.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((item) =>
                                item.dish.id === dish.id
                                    ? {...item, quantity: item.quantity + quantity}
                                    : item
                            ),
                        };
                    }
                    return {cart: [...state.cart, {dish, quantity}]};
                }),
            updateQuantity: (dishId, change) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.dish.id === dishId
                            ? {...item, quantity: Math.max(1, item.quantity + change)}
                            : item
                    ),
                })),
            removeFromCart: (dishId) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.dish.id !== dishId),
                })),
            clearCart: () => set({cart: []}),
        }),
        {
            name: "cart-storage",
            onRehydrateStorage: () => (state) => {
                if (state) state.setHydrated(true);
            },
        }
    )
);
