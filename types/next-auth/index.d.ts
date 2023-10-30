import NextAuth, { DefaultSession, DefaultUser }  from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            riot?: string | null;
            tokens: {
                idToken: string
            }
        } & DefaultSession['user'];
    }
    interface User {
        riot?: string | null;
    }
}