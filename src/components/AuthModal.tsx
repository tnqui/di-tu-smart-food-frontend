"use client";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog";
import {AuthCard} from "@/components/AuthCard";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

type AuthModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function AuthModal({open, onOpenChange}: AuthModalProps) {

    const {data: session} = useSession();

    useEffect(() => {
        if (session) {
            onOpenChange(false);
        }
    }, [session, onOpenChange]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm"/>
            <DialogContent
                className="sm:max-w-md w-full bg-white rounded-lg shadow-xl p-6
                   border border-gray-200
                   animate-in zoom-in-90
                   focus:outline-none"
            >
                <DialogTitle className="text-2xl font-semibold text-center mb-4">
                    Đăng nhập hoặc đăng ký
                </DialogTitle>
                <AuthCard/>
            </DialogContent>
        </Dialog>
    );
}
