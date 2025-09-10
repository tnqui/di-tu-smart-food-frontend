"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";

export default function Page() {
    const [data, setData] = useState<any>(null);  // State lưu dữ liệu trả về từ API
    const [loading, setLoading] = useState(true);  // State theo dõi trạng thái loading
    const [error, setError] = useState<Error | null>(null);  // State theo dõi lỗi
    const [url, setUrl] = useState<string>("");  // State lưu phần path của API
    const [params, setParams] = useState<any>({});  // State lưu các tham số request
    const [numParams, setNumParams] = useState<number>(0);  // State lưu số lượng tham số

    // URL cố định là localhost:8080
    const baseUrl = "http://localhost:8080";

    // Hàm xử lý thay đổi số lượng tham số
    const handleNumParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumParams(Number(e.target.value));
    };

    // Hàm cập nhật các tham số key-value
    const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'key' | 'value') => {
        setParams((prevParams) => {
            const newParams = { ...prevParams };
            const paramKey = `param${index + 1}`;
            newParams[paramKey] = newParams[paramKey] || {};  // Đảm bảo rằng paramKey luôn tồn tại

            // Cập nhật key hoặc value
            if (field === 'key') {
                newParams[paramKey].key = e.target.value;
            } else {
                newParams[paramKey].value = e.target.value;
            }

            return newParams;
        });
    };

    // Hàm tạo query string từ params
    const createQueryString = (params: any) => {
        return Object.entries(params)
            .map(([key, { key: paramKey, value }]) => `${encodeURIComponent(paramKey)}=${encodeURIComponent(value)}`)
            .join("&");
    };

    // Hàm xử lý khi người dùng bấm "OK"
    const handleOnClick = async () => {
        try {
            setLoading(true);
            setError(null);

            // Tạo query string từ params
            const queryString = createQueryString(params);

            // Nếu có path, nối với baseUrl, nếu không thì chỉ dùng baseUrl
            const fullUrl = `${baseUrl}${url}${queryString ? `?${queryString}` : ""}`;  // Nối URL với query string

            const response = await api.get(fullUrl);  // Gửi request API với URL và params
            setData(response.data);  // Lưu dữ liệu vào state
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    // Tạo URL hiển thị đầy đủ với các tham số
    const generateFullUrl = () => {
        const queryString = createQueryString(params);
        return `${baseUrl}${url}${queryString ? `?${queryString}` : ""}`; // Nối baseUrl với path và params
    };

    // Hàm reset lại params và số lượng params
    const handleReset = () => {
        setUrl("");  // Reset URL
        setParams({});  // Reset params
        setNumParams(0);  // Reset số lượng tham số
        setData(null);  // Reset dữ liệu API
    };

    return (
        <>
            <div>
                <label htmlFor="url">API Path:</label>
                <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter API path (e.g., /users, /posts)"
                    className="border p-2 mb-2"
                />
            </div>

            {/* Hiển thị URL sau khi thêm các tham số */}
            <div>
                <strong>Full URL:</strong>
                <span>{generateFullUrl()}</span> {/* Hiển thị URL đầy đủ */}
            </div>

            {/* Nhập số lượng tham số */}
            <div>
                <label htmlFor="numParams">Number of Params:</label>
                <input
                    type="number"
                    id="numParams"
                    value={numParams}
                    onChange={handleNumParamsChange}
                    placeholder="Enter number of params"
                    className="border p-2 mb-2"
                />
            </div>

            {/* Tạo các trường nhập liệu cho key và value dựa trên số lượng tham số */}
            {Array.from({ length: numParams }).map((_, index) => {
                const paramKey = `param${index + 1}`;
                return (
                    <div key={paramKey} className="mb-2">
                        <label htmlFor={`${paramKey}-key`}>Param {index + 1} Key:</label>
                        <input
                            type="text"
                            id={`${paramKey}-key`}
                            placeholder="Enter key"
                            className="border p-2 mb-2"
                            value={params[paramKey]?.key || ""} // Đảm bảo rằng key tồn tại
                            onChange={(e) =>
                                handleParamChange(e, index, 'key')  // Cập nhật key
                            }
                        />
                        <label htmlFor={`${paramKey}-value`}>Param {index + 1} Value:</label>
                        <input
                            type="text"
                            id={`${paramKey}-value`}
                            placeholder="Enter value"
                            className="border p-2 mb-2"
                            value={params[paramKey]?.value || ""} // Đảm bảo rằng value tồn tại
                            onChange={(e) =>
                                handleParamChange(e, index, 'value')  // Cập nhật value
                            }
                        />
                    </div>
                );
            })}

            {/* Nút gửi request */}
            <Button onClick={handleOnClick}>Fetch Data</Button>

            {/* Nút reset */}
            <Button onClick={handleReset} className="ml-2" variant="outline">
                Reset Params
            </Button>

            {/* Hiển thị lỗi nếu có */}
            {error && <div className="text-red-500">Error: {error.message}</div>}

            {/* Hiển thị dữ liệu nếu có */}
            {loading && <div>Loading...</div>}
            {data && !loading && (
                <pre>{JSON.stringify(data, null, 2)}</pre>  // Hiển thị dữ liệu dưới dạng JSON
            )}
        </>
    );
}
