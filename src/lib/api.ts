import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:8080/api",
    // withCredentials: true, // dùng nếu backend cần cookie
});

// --- API endpoints ---

// Category
export const fetchCategories = () => api.get(`/categories/all`);

// DeliveryMethod
export const fetchDeliveryMethods = () => api.get("/delivery-methods/all");

export const fetchDishes = ({
                                page,
                                limit,
                                categoryId
                            }: {
    page: number | null;
    limit: number | null;
    categoryId: number | null;
}) => {
    const params: { [key: string]: any } = {};

    if (page !== null && page !== undefined) params.page = page;
    if (limit !== null && limit !== undefined) params.limit = limit;
    if (categoryId !== null && categoryId !== undefined) params.categoryId = categoryId;

    return api.get("/menu-items", {
        params,
    });
};


// Auth
export const login = (data: { email: string; password: string }) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");
