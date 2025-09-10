"use client";

import Link from "next/link";
import Image from "next/image";
import {NavMenu} from "@/components/NavMenu";
import {Profile} from "@/components/Avatar";
import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import {ModeToggle} from "@/components/ModeToggle";
import {useTheme} from "next-themes";

export default function Header() {
    return (
        <>
            <header
                className="sticky top-0 z-50 border-b bg-white dark:bg-gray-900 w-full py-3 px-4 sm:px-8 md:px-32 lg:px-40">
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
                        <Profile/>
                        <ModeToggle/>
                    </div>

                </div>
            </header>
        </>
    );
}

