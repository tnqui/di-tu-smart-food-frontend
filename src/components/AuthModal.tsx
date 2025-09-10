"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import {AuthCard} from "@/components/AuthCard"


export function AuthModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                    Đăng Nhập
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-0 border-0 shadow-none">
                <AuthCard/>
            </DialogContent>
        </Dialog>
    )
}
