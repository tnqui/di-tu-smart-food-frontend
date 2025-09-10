"use client"

import "./globals.css";
import {cn} from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, {useEffect} from "react";
import {SessionProvider, useSession} from "next-auth/react";
import {useGlobalStore} from "@/store/useGlobalStore";
import {Toaster} from "@/components/ui/sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import {ThemeProvider} from "@/components/theme-provider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        useGlobalStore.getState().fetchInitialData();
    }, []);

    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Toaster position="bottom-right"/>
                <div className="min-h-screen flex flex-col">
                    <Header/>
                    <div
                        className="flex-1 flex flex-col bg-gray-100 dark:bg-black py-2 px-5 px-4 sm:px-8 md:px-32 lg:px-40">
                        <Breadcrumbs/>
                        <main>
                            {children}
                        </main>
                    </div>
                    <Footer/>
                </div>
            </ThemeProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
