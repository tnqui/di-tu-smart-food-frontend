import {create} from "zustand";

type OrderItem = {
    dishId: number;
    quantity: number;
    priceAtOrderTime: number;
};

type OrderState = {
    userId: string | null;
    recipientName: string;
    recipientPhone: string;
    paymentMethod: "COD" | "Banking";
    deliveryMethod: "Shipper" | "Takeaway";
    shippingAddress: string;
    items: OrderItem[];
    setAddress: (data: {
        recipientName: string;
        recipientPhone: string;
        shippingAddress: string;
    }) => void | undefined;
    setItems: (items: OrderItem[]) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
    userId: null,
    recipientName: "",
    recipientPhone: "",
    paymentMethod: "COD",
    deliveryMethod: "Shipper",
    shippingAddress: "",
    items: [],

    setAddress: (data) =>
        set((state) => ({
            ...state,
            ...data, // merge vào state
        })),

    setItems: (items) =>
        set((state) => ({
            ...state,
            items,
        })),
}));
