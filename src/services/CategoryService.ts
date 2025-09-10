import {Category} from "@/types/types";
import {api} from "@/lib/api";

interface CategoryResponse {
    code: number;
    result: Category[];
}

export async function getAllCategories(): Promise<Category[]> {
    const res = await api.get<CategoryResponse>("/categories");
    if (!res.data || !res.data.result) {
        throw new Error("Failed to fetch categories");
    }
    return res.data.result;
}
