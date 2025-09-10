// types.ts
export interface Category {
    id: number | null;
    name: string;
    imageUrl: string | undefined | null;
}
//
// export interface Dish {
//     id: number;
//     name: string;
//     price: number;
//     oldPrice: number | null;
//     imageUrl: string;
//     rating: number;
//     tag: string | null;
//     description: string;
//     categories: { name: string }[];
// }
//
// export interface DishResponse {
//     total: number;
//     page: number;
//     perPage: number;
//     dishes: Dish[];
// }
//
// export interface CartItem {
//     dish: Dish;
//     quantity: number;
// }

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