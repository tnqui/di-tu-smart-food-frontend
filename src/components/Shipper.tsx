"use client";

import {motion} from "framer-motion";
import Image from "next/image";

export default function Shipper() {
    return (
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
            <motion.div
                className="absolute bottom-0"
                initial={{x: "-150px", rotateY: 0}}
                animate={{x: "100vw"}}
                transition={{
                    duration: 5,
                    repeat: Infinity, // Lặp lại vô hạn
                    ease: "linear",   // Chạy đều
                }}
            >
                <motion.div
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 0.3,
                    }}
                    whileHover={{rotate: [0, -5, 5, -5, 0]}}
                >
                    <Image
                        src="/shipper.png"
                        alt="Shipper"
                        width={120}
                        height={120}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
