"use client";

import {useCartStore} from "@/store/useCartStore";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export default function CheckoutGuard({children}: { children: React.ReactNode }) {
    const cart = useCartStore((state) => state.cart);
    const isHydrated = useCartStore((state) => state.isHydrated);
    const router = useRouter();

    useEffect(() => {
        if (isHydrated && cart.length === 0) {
            toast.error("Giỏ hàng trống, không thể vào trang thanh toán!");
            router.push("/menu");
        }
    }, [cart, isHydrated, router]);

    if (!isHydrated) return null;

    if (cart.length === 0) return null;

    return <>{children}</>;
}
