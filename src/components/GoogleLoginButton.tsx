"use client";

import {Button} from "@/components/ui/button";

export default function GoogleLoginButton() {
    const handleGoogleLogin = () => {
        // Redirect browser, không dùng fetch
        window.location.href = "http://localhost:8080/auth/google";
    };

    return (
        <Button onClick={handleGoogleLogin} className="w-full">
            Đăng nhập với Google
        </Button>
    );
}
