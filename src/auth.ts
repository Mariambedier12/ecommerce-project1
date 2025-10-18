import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";


interface AuthUser extends User {
  id: string;
  role: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (
        credentials?: Record<'email' | 'password', string>
      ): Promise<AuthUser | null> => {
        if (!credentials) return null;

        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const payload = await res.json();

        if (payload.message === 'success') {
          const decode = JSON.parse(
            Buffer.from(payload.token.split('.')[1], 'base64').toString()
          );

          return {
            id: decode.id,
            name: payload.user.name || '',
            email: payload.user.email || '',
            role: payload.user.role || 'user',
            image: payload.user.image || '',
            token: payload.token || '',
          };
        }

        return null;
      },
    }),

    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.name = authUser.name || '';
        token.email = authUser.email || '';
        token.role = authUser.role || 'user';
        token.image = authUser.image || '';
        token.token = authUser.token || '';
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name || '',
        email: token.email || '',
        role: token.role || 'user',
        image: token.image || '',
        token: token.token || '',
      };
      return session;
    },
  },
};
