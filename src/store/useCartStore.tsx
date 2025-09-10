// import { create } from "zustand";
// import { CartItem, Dish } from "@/types/types";
//
// type CartState = {
//     cart: CartItem[];
//     addToCart: (dish: Dish) => void;
//     removeFromCart: (dishId: number) => void;
//     clearCart: () => void;
//     updateQuantity: (dishId: number, change: number) => void;
// };
//
// export const useCartStore = create<CartState>((set) => ({
//     cart: [],
//     addToCart: (dish) =>
//         set((state) => {
//             const existing = state.cart.find((item) => item.dish.id === dish.id);
//             if (existing) {
//                 return {
//                     cart: state.cart.map((item) =>
//                         item.dish.id === dish.id
//                             ? { ...item, quantity: item.quantity + 1 }
//                             : item
//                     ),
//                 };
//             }
//             return { cart: [...state.cart, { dish, quantity: 1 }] };
//         }),
//     updateQuantity: (dishId, change) =>
//         set((state) => ({
//             cart: state.cart.map((item) =>
//                 item.dish.id === dishId
//                     ? { ...item, quantity: Math.max(1, item.quantity + change) }
//                     : item
//             ),
//         })),
//     removeFromCart: (dishId) =>
//         set((state) => ({
//             cart: state.cart.filter((item) => item.dish.id !== dishId),
//         })),
//     clearCart: () => set({ cart: [] }),
// }));
