import React from 'react';

interface ErrorFallbackProps {
    error: string;
    retry: () => void;
}

export function ErrorFallback({ error, retry }: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center max-w-md">
                <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.764 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Có lỗi xảy ra</h3>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <button
                    onClick={retry}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Thử lại
                </button>
            </div>
        </div>
    );
}