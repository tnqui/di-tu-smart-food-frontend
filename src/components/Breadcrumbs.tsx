"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {routeTree} from "@/config/breadcrumbs";

export default function Breadcrumbs() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);
    const paths = segments.map((_, index) => "/" + segments.slice(0, index + 1).join("/"));

    // nếu là trang chủ thì chỉ hiển thị Trang chủ
    if (pathname === "/") {
        return null;
    }

    return (
        <nav className="flex justify-start items-center text-sm text-gray-600 h-10 mb-2">
            <ol className="flex items-center space-x-2">
                {/* Luôn có Trang chủ */}
                <li>
                    <Link href="/" className="hover:underline">
                        {routeTree["/"]}
                    </Link>
                </li>

                {paths.map((path, index) => {
                    const label = routeTree[path] ?? path;
                    const isLast = index === paths.length - 1;

                    return (
                        <li key={path} className="flex items-center space-x-2">
                            <span>/</span>
                            {isLast ? (
                                <span className="font-medium text-gray-900">{label}</span>
                            ) : (
                                <Link href={path} className="hover:underline">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
