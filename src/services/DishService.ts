import {api} from "@/lib/api"

interface dishParams {
    page?: number;
    size?: number;
    categoryId?: number;
}

export const dishService = {
    getDishesPagination: ({page, size, categoryId}: dishParams) => {
        const params: Record<string, any> = {};

        if (page) params.page = page;
        if (size) params.size = size;
        if (categoryId) params.categoryId = categoryId;

        return api.get(`/dishes`, {params})

    }
};