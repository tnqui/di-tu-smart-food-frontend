import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Toaster} from "@/components/ui/sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import InfoBar from "@/components/InfoBar";
import {Providers} from "@/components/Providers";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <Providers>
            <Toaster position="bottom-right" richColors/>
            <InfoBar/>
            <Header/>

            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex flex-col bg-gray-100 dark:bg-black px-4 sm:px-8 md:px-40 lg:px-50">
                    <Breadcrumbs/>
                    <main>{children}</main>
                </div>
                <Footer/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
