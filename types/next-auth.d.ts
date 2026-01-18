
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      firstName?: string
      lastName?: string
      isAdmin?: boolean
      image?: string
    }
  }

  interface User {
    firstName?: string
    lastName?: string
    isAdmin?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName?: string
    lastName?: string
    isAdmin?: boolean
  }
}
