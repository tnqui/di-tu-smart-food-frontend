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