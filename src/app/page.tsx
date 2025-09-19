"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import Shipper from "@/components/Shipper";
import {AuthModal} from "@/components/AuthModal";


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-16">
            {/* Hero section */}
            <div className="text-center space-y-6 max-w-2xl">
                <Shipper/>
                <h1 className="text-4xl font-bold tracking-tight">
                    Đặt món ăn nhanh chóng & tiện lợi 🍔
                </h1>

                <p className="text-lg text-muted-foreground">
                    Chọn món từ menu đa dạng, thêm vào giỏ hàng và đặt ngay chỉ với vài cú click.
                </p>

                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/menu">Gọi Món Ngay</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
