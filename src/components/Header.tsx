"use client";

import Link from "next/link";
import Image from "next/image";
import {NavMenu} from "@/components/NavMenu";
import {Profile} from "@/components/Avatar";
import React from "react";
import {CartButton} from "@/components/CartButton";
import {usePathname} from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <>
            <header
                className="sticky top-0 z-50 border-b bg-white dark:bg-gray-900 w-full pb-1 px-4 sm:px-8 md:px-40 lg:px-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between ">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="logo" width={60} height={60} priority/>
                    </Link>

                    <div className="hidden md:flex space-x-6">
                        <NavMenu/>
                    </div>

                    {/* Profile */}
                    <div className={"flex items-center justify-between gap-1"}>
                        {pathname === "/menu" && <CartButton/>}
                    </div>

                </div>
            </header>
        </>
    );
}

