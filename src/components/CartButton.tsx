// "use client";
//
// import Link from "next/link";
// import {Button} from "@/components/ui/button";
// import {ShoppingBagIcon} from "lucide-react";
// import {useCartStore} from "@/store/useCartStore";
// import {useEffect, useRef} from "react";
// import {motion, useAnimation} from "framer-motion";
//
// export function CartButton() {
//     const cart = useCartStore((state) => state.cart);
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//
//     const prevTotalRef = useRef(totalItems);
//     const controls = useAnimation();
//
//     useEffect(() => {
//         if (totalItems > prevTotalRef.current) {
//             controls.start({
//                 rotate: [0, -10, 10, -10, 0],
//                 scale: [1, 1.3, 1.3, 1.3, 1],
//                 transition: {
//                     duration: 0.6,
//                     ease: "easeInOut"
//                 }
//             });
//         }
//
//         prevTotalRef.current = totalItems;
//     }, [totalItems, controls]);
//
//     return (
//         <Link href="/menu/cart" className="relative">
//             <Button
//                 className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-black text-white"
//             >
//                 <motion.div
//                     animate={{
//                         rotate: [0, -5, 5, -5, 0],
//                         scale: [1, 1.1, 1.1, 1.1, 1],
//                     }}
//                     transition={{
//                         duration: 2,
//                         ease: "easeInOut",
//                         repeat: Infinity,
//                         repeatType: "loop",
//                     }}
//                 >
//                     <ShoppingBagIcon className="w-6 h-6"/>
//                 </motion.div>
//                 {totalItems > 0 && (
//                     <span
//                         className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
//                     >
//                 {totalItems}
//             </span>
//                 )}
//             </Button>
//         </Link>
//
//     );
// }
