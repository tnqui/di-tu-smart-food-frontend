// tailwind.config.ts
import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                "slide-in": "slideIn 0.4s ease-out",
                "slide-out": "slideOut 0.3s ease-in",
            },
            keyframes: {
                slideIn: {
                    "0%": {transform: "translateX(100%)", opacity: 0},
                    "100%": {transform: "translateX(0)", opacity: 1},
                },
                slideOut: {
                    "0%": {transform: "translateX(0)", opacity: 1},
                    "100%": {transform: "translateX(100%)", opacity: 0},
                },
            },
        },
    },
    plugins: [],
};

export default config;
