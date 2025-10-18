/* eslint-disable*/

import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {


  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
      image?: string
      token: string

    }
  }

  interface User extends DefaultUser {
    id: string
    role: string
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string
    email: string
    role: string
    token: string
    image?: string
  }
}

