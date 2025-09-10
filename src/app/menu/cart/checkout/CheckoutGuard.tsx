// // app/checkout/CheckoutGuard.tsx
// "use client";
//
// import {useCartStore} from "@/store/useCartStore";
// import {useEffect} from "react";
// import {redirect} from "next/navigation";
// import {toast} from "sonner";
//
// export default function CheckoutGuard({children}: { children: React.ReactNode }) {
//     const cart = useCartStore((state) => state.cart);
//
//     useEffect(() => {
//         if (cart.length === 0) {
//             toast.error("Giỏ hàng trống, không thể vào trang thanh toán!");
//             redirect("/menu");
//         }
//     }, [cart]);
//
//     if (cart.length === 0) return null;
//
//     return <>{children}</>;
// }
