"use client"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link"
import GoogleLoginButton from "@/components/GoogleLoginButton"
import {useState} from "react"
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation"

export function AuthCard() {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const res = await signIn("credentials", {
            redirect: false,
            identifier,
            password,
        })

        if (res?.error) {
            setError("Sai email hoặc mật khẩu")
        } else {
            router.push("/menu")
        }

        setLoading(false)
    }

    return (
        <Card className="w-full max-w-xl shadow-lg border p-6">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
                <CardDescription>Nhập thông tin để tiếp tục</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="identifier">Email hoặc số điện thoại</Label>
                        <Input
                            id="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" className="w-full mt-2" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
                <GoogleLoginButton/>
                <p className="text-sm text-muted-foreground text-center">
                    Chưa có tài khoản?{" "}
                    <Link href="/register" className="underline hover:text-primary">
                        Đăng ký ngay
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
