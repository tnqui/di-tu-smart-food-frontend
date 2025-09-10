import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"
import {Address} from "@/types/types";

declare module "next-auth" {
    interface Session {
        accessToken?: string
        refreshToken?: string
        error?: string
        user: {
            id: string
            email: string
            name: string
            phone?: string
            avatarUrl?: string
            addresses?: Address[]   // 👈
        }
    }

    interface User {
        accessToken?: string
        refreshToken?: string
        phone?: string
        avatarUrl?: string
        addresses?: Address[]     // 👈
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        refreshToken?: string
        accessTokenExpires?: number
        error?: string
        phone?: string
        avatarUrl?: string
        addresses?: Address[]     // 👈
    }
}

