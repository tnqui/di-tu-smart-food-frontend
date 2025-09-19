"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ShoppingBagIcon} from "lucide-react";
import {useCartStore} from "@/store/useCartStore";
import {useEffect, useRef, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import {toast} from "sonner";

export function CartButton() {
    const cart = useCartStore((state) => state.cart);
    const totalItems = cart.length;

    const prevTotalRef = useRef(totalItems);
    const controls = useAnimation();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;

        if (totalItems > prevTotalRef.current) {
            controls.start({
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.2, 1.2, 1.2, 1],
                transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                }
            });
        }

        prevTotalRef.current = totalItems;
    }, [totalItems, controls, hasMounted]);

    return (
        <Link href="/menu/cart" className="relative inline-block">
            <motion.div
                animate={controls}
                initial={{rotate: 0, scale: 1}}
                whileHover={{scale: 1.1}}
                className="w-full h-full text-black dark:text-white cursor-pointer"
            >
                <ShoppingBagIcon className="w-5 h-5"/>
            </motion.div>

            {totalItems > 0 && (
                <span
                    className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-sm font-bold text-white bg-red-500 rounded-full"
                >
                    {totalItems}
                </span>
            )}
        </Link>
    );
}
