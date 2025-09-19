// app/checkout/layout.tsx
import {ReactNode} from "react";
import CheckoutGuard from "@/app/menu/cart/checkout/CheckoutGuard";

export default function CheckoutLayout({children}: { children: ReactNode }) {
    return <CheckoutGuard>{children}</CheckoutGuard>;
}
