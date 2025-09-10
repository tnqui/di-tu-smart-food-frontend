class ApiService {
    private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

    async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            const data = await response.json();

            // Validate API response structure
            if (data.code !== 1000) {
                throw new ApiError(`API Error: Code ${data.code}`, data.code);
            }

            return data;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError('Network error occurred', 0);
        }
    }
}

export class ApiError extends Error {
    constructor(message: string, public code: number) {
        super(message);
        this.name = 'ApiError';
    }
}

export const apiService = new ApiService();
