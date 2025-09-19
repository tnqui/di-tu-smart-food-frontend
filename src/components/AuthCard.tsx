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
            close();
        }
        setLoading(false)
    }

    return (
        <Card className="w-full max-w-xl shadow-lg border p-6 space-y-3">
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
                <div className="flex justify-center items-center gap-2">
                    <Label className={"whitespace-nowrap"}>
                        Đăng Nhập Với
                    </Label>
                    <div className={"flex gap-1"}>
                        {/* Google Button */}
                        <Button
                            className="flex items-center justify-center w-12 h-10 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4"
                                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853"
                                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05"
                                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335"
                                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        </Button>

                        {/* Facebook Button */}
                        <Button
                            disabled
                            className="flex items-center justify-center w-12 h-10 bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#1877f2"
                                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </Button>

                        {/* Apple ID Button */}
                        <Button
                            disabled
                            className="flex items-center justify-center w-12 h-10 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#000000"
                                      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                        </Button>
                    </div>
                </div>
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
