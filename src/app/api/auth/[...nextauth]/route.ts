import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

async function refreshAccessToken(token: any) {
    try {
        const res = await fetch("http://localhost:8080/auth/refresh", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refreshToken: token.refreshToken})
        })

        const refreshed = await res.json()

        if (!res.ok || refreshed.code !== 1000) {
            throw refreshed
        }

        return {
            ...token,
            accessToken: refreshed.result.accessToken,
            refreshToken: refreshed.result.refreshToken ?? token.refreshToken,
            accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1h
        }
    } catch (error) {
        console.error("Error refreshing access token", error)
        return {...token, error: "RefreshAccessTokenError"}
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials?.password) return null

                try {
                    const res = await fetch("http://localhost:8080/auth/login", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            identifier: credentials.identifier,
                            password: credentials.password,
                        }),
                    })

                    const data = await res.json()

                    if (res.ok && data.code === 1000) {
                        return {
                            id: data.result.userId,
                            email: data.result.email,
                            name: data.result.fullName,
                            phone: data.result.phone,
                            avatarUrl: data.result.avatarUrl,
                            addresses: data.result.addresses,
                            accessToken: data.result.accessToken,
                            refreshToken: data.result.refreshToken,
                        }
                    }
                } catch (err) {
                    console.error("Login error:", err)
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({token, user, account}) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: Date.now() + 60 * 60 * 1000,
                    phone: user.phone,
                    avatarUrl: user.avatarUrl,
                    addresses: user.addresses, // 👈 giữ addresses trong JWT
                }
            }

            if (Date.now() < (token.accessTokenExpires as number)) {
                return token
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.phone = token.phone as string
                session.user.avatarUrl = token.avatarUrl as string
                session.user.addresses = token.addresses as any[] // 👈 thêm
                session.accessToken = token.accessToken as string
                session.refreshToken = token.refreshToken as string
                session.error = token.error as string
            }
            return session
        },

    },
    session: {strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
