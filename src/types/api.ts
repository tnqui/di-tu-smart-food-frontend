export interface ApiResponse<T> {
    code: number;
    result: {
        content: T[];
        pageable: {
            pageNumber: number;
            pageSize: number;
            offset: number;
        };
        totalPages: number;
        totalElements: number;
        last: boolean;
        first: boolean;
        numberOfElements: number;
    };
}

export interface Dish {
    id: number;
    name: string;
    price: number;
    oldPrice: number | null;
    orderCount: number;
    imageUrl: string;
    rating: number;
    tag: string | null;
    description: string;
}

export interface CartItem {
    dish: Dish;
    quantity: number;
}

export interface Address {
    id: number
    label: string
    fullAddress: string
    latitude: number
    longitude: number
    defaultAddress: boolean
    name?: string
    phone?: string
}

export interface DeliveryMethods{
    name: string,
    description: string,
    price: number,
    time: number
}

export interface Category {
    id: number | null;
    name: string;
    imageUrl: string | undefined | null;
}

type OrderItem = {
    dishId: number;
    quantity: number;
    priceAtOrderTime: number;
};

export type CreateOrderRequest = {
    userId: string;
    recipientName: string;
    recipientPhone: string;
    paymentMethod: string;
    deliveryMethod: string;
    shippingAddress: string;
    items: OrderItem[];
};

export type AddressFormData = {
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
};
